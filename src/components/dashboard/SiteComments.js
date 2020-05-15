/* eslint-disable react/jsx-fragments */
// src/pages/SiteComments.js
import React, { useContext, useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../Card';
import Button from '../Button';
import Spacer from '../Spacer';
import { AppContext } from '../../providers/AppProvider';
import { isBrowser } from '../../utils/isBrowser';
import { shortenText } from '../../utils/shortenText';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Row from '../grid/Row';
import CommentsTable, { SelectColumnFilter } from '../CommentsTable';

const SiteComments = () => {
  const { setNotificationType, setNotificationMessage } = useContext(
    AppContext
  );
  const { state, q } = useContext(DatabaseContext);
  const { user, site, siteClient, userClient } = state;
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('held-for-review')
      ? 'held'
      : 'published'
  );
  const [comments, setComments] = useState([]);
  const [commentsToShow, setCommentsToShow] = useState(comments);
  const [reRender, setRender] = useState(false);
  const loadedComments = [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loadedComments && loadedComments.length > 0) {
      // setComments(loadedComments);
    } else {
      setLoading(true);
      siteClient
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_comments')), { size: 10000 }),
            q.Lambda(
              'commentsRef',
              q.Let(
                {
                  comments: q.Get(q.Var('commentsRef')),
                  user: q.Get(q.Select(['data', 'user'], q.Var('comments'))),
                  site: q.Get(q.Select(['data', 'site'], q.Var('comments'))),
                },
                {
                  ref: q.Select(['ref'], q.Var('comments')),
                  data: q.Select(['data'], q.Var('comments')),
                }
              )
            )
          )
        )
        .then((response) => {
          setComments(response.data);
          setCommentsToShow(response.data);
          const dataToDelete = [];
          setTimeout(() => {
            setLoading(false);
          }, 1000);

          response.data.map((newData) =>
            dataToDelete.push(newData.ref.value.id)
          );

          // siteClient
          //   .query(
          //     q.Map(
          //       dataToDelete,
          //       q.Lambda(
          //         'data',
          //         q.Delete(
          //           q.Ref(
          //             q.Collection('comments'),
          //             // q.Select(
          //             //   ['id'],
          //             q.Var('data')
          //             // )
          //           )
          //         )
          //       )
          //     )
          //   )
          //   .then((responseTwo) => {
          //     console.log(responseTwo);
          //     setRender(true);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  }, []);

  console.log('ALL COMMENTS: ', comments);

  useEffect(() => {
    if (reRender) {
      siteClient
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_comments'))),
            q.Lambda(
              'commentsRef',
              q.Let(
                {
                  comments: q.Get(q.Var('commentsRef')),
                  user: q.Get(q.Select(['data', 'user'], q.Var('comments'))),
                  site: q.Get(q.Select(['data', 'site'], q.Var('comments'))),
                },
                {
                  ref: q.Select(['ref'], q.Var('comments')),
                  data: q.Select(['data'], q.Var('comments')),
                }
              )
            )
          )
        )
        .then((response) => {
          console.log('Response comments: ', response.data);
          setComments(response.data);
          setCommentsToShow(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });

      setRender(false);
    }
  }, [reRender]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        // Use a two-stage aggregator here to first
        // count the total rows being aggregated,
        // then sum any of those counts if they are
        // aggregated further
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} Names`,
      },
      {
        Header: 'Comment',
        accessor: 'comment',
        // Use our custom `fuzzyText` filter on this column
        // filter: 'fuzzyText',
        // Use another two-stage aggregator here to
        // first count the UNIQUE values from the rows
        // being aggregated, then sum those counts if
        // they are aggregated further
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Comments`,
      },
      {
        Header: 'Page Path',
        accessor: 'path',
        // Use a two-stage aggregator here to first
        // count the total rows being aggregated,
        // then sum any of those counts if they are
        // aggregated further
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} Pages`,
      },
    ],
    []
  );

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = React.useRef(false);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    skipResetRef.current = false;
  }, [commentsToShow]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => {
    // Don't reset the page when we do this
    skipResetRef.current = true;
    setCommentsToShow(comments);
  };

  const formatCommentsApproved = () => {
    const newComments = [];
    commentsToShow &&
      commentsToShow.length > 0 &&
      commentsToShow
        .filter((comment) => !comment.data.draft)
        .forEach((comment) => {
          newComments.push({
            name: comment.data.name,
            comment: shortenText(comment.data.comment, 50),
            date: comment.data.date,
            path: comment.data.path || '/',
            ref: comment.ref.value.id,
          });
        });

    return newComments;
  };

  const formatCommentsHeld = () => {
    const newComments = [];
    commentsToShow &&
      commentsToShow.length > 0 &&
      commentsToShow
        .filter((comment) => comment.data.draft)
        .forEach((comment) => {
          newComments.push({
            name: comment.data.name,
            comment: shortenText(comment.data.comment, 50),
            date: comment.data.date,
            path: comment.data.path || '/',
            ref: comment.ref.value.id,
          });
        });

    return newComments;
  };

  const dummyData = () => {
    const newComments = [];

    newComments.push({
      name: 'Jack Smith',
      comment:
        'Blasdh ksldaf lskhdf khsfsjkdlf ,s fksldj sfljdf lhf slkhklsdhf slkh flkhs',
      date: '02/07/2001',
      path: '/react-tips-again',
      ref: '234b23mbg34ty',
    });

    newComments.push({
      name: 'Jarod Peachey',
      comment: 'Blasd khsf  fsdflhsf kh sklhf slkhklsdhf slkh flkhs',
      date: '10/07/2001',
      path: '/reacips',
      ref: '234bt7fdsf3mbg34ty',
    });

    newComments.push({
      name: 'Bill Doe',
      comment: 'Blasdh lskhdf khsf  fsdflhsf kh sklhf slkhklsdhf slkh flkhs',
      date: '10/07/2001',
      path: '/react-tips-fo',
      ref: '234bt734ty',
    });

    newComments.push({
      name: 'Jarod William',
      comment:
        'Blasdh ksldaf lskhdf khsf  fsdflhsf kh sklhf slkhklsdhf slkh flkhs, asdfkj ksjdf ',
      date: '10/07/2001',
      path: '/react',
      ref: '234bt723mbdg34ty',
    });

    newComments.push({
      name: 'Mike Williamson',
      comment: 'Blasdh ksldaf lskhdf khsf slkh flkhs',
      date: '10/07/2001',
      path: '/react-tips-for-dumb',
      ref: '234bt723mbsdfg34ty',
    });

    newComments.push({
      name: 'Jarod Peachey',
      comment:
        'Blasdh ksldaf lskhdf khsf  fsdflhsf kh sklhf slkhklsdhf slkh flkhs',
      date: '10/07/2001',
      path: '/react-tips',
      ref: '234bt723mbg34ty',
    });

    return newComments;
  };

  const deleteComments = (selectedComments) => {
    const allCheckboxes = document.querySelectorAll('.checkbox');

    if (confirm('Are you sure you want to delete these comments?')) {
      const commentsToDelete = [];

      selectedComments.forEach((comment) => {
        commentsToDelete.push(comment.original.ref);
      });

      setLoading(true);

      siteClient
        .query(
          q.Map(
            commentsToDelete,
            q.Lambda(
              'data',
              q.Delete(q.Ref(q.Collection('comments'), q.Var('data')))
            )
          )
        )
        .then((response) => {
          console.log(response);
          setRender(true);
          setNotificationMessage('Comments successfully deleted.');
        })
        .catch((err) => {
          console.log(err);
          setNotificationMessage('There was an error deleting your comments');
          setNotificationType('error');
        });
    }
  };

  const approveComments = (selectedComments) => {
    const allCheckboxes = document.querySelectorAll('.checkbox');

    if (confirm('Are you sure you want to approve these comments?')) {
      const commentsToApprove = [];

      selectedComments.forEach((comment) => {
        commentsToApprove.push(comment.original.ref);
      });

      setLoading(true);

      siteClient
        .query(
          q.Map(
            commentsToApprove,
            q.Lambda(
              'data',
              q.Update(q.Ref(q.Collection('comments'), q.Var('data')), {
                data: {
                  draft: false,
                },
              })
            )
          )
        )
        .then((response) => {
          console.log(response);
          setRender(true);
          setNotificationMessage('Comments approved!');
        })
        .catch((err) => {
          console.log(err);
          setNotificationMessage('There was an error approving your comments');
          setNotificationType('error');
        });
    }
  };

  const unapproveComments = (selectedComments) => {
    const allCheckboxes = document.querySelectorAll('.checkbox');

    if (confirm('Are you sure you want to approve these comments?')) {
      const commentsToApprove = [];

      selectedComments.forEach((comment) => {
        commentsToApprove.push(comment.original.ref);
      });

      setLoading(true);

      siteClient
        .query(
          q.Map(
            commentsToApprove,
            q.Lambda(
              'data',
              q.Update(q.Ref(q.Collection('comments'), q.Var('data')), {
                data: {
                  draft: true,
                },
              })
            )
          )
        )
        .then((response) => {
          console.log(response);
          setRender(true);
          setNotificationMessage('Comments moved!');
        })
        .catch((err) => {
          console.log(err);
          setNotificationMessage('There was an error moving your comments');
          setNotificationType('error');
        });
    }
  };

  return (
    // <DelayedLoad>
    <span>
      <Row spacing={[32]} breakpoints={[769]}>
        <div widths={[3]}>
          <Tabs>
            <Tab
              active={activeTab === 'published'}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.pushState(
                    {},
                    '',
                    `/dashboard/sites/${site.data.id}/comments/published`
                  );
                }
                setActiveTab('published');
              }}
            >
              <FontAwesomeIcon icon='check' />
              Published
            </Tab>
            <Tab
              active={activeTab === 'held'}
              onClick={() => {
                if (isBrowser()) {
                  window.history.pushState(
                    {},
                    '',
                    `/dashboard/sites/${site.data.id}/comments/held-for-review`
                  );
                }
                setActiveTab('held');
              }}
            >
              <FontAwesomeIcon icon='cog' />
              Held For Review
            </Tab>
          </Tabs>
        </div>
        <div widths={[9]}>
          {activeTab === 'published' && (
            <>
              <h1 className='m-none'>Approved Comments</h1>
              <Spacer height={24} />
              <Card>
                {(comments && comments.length) || loading ? (
                  <CommentsTable
                    deleteComments={deleteComments}
                    unapproveComments={unapproveComments}
                    columns={columns}
                    data={loading ? dummyData() : formatCommentsApproved()}
                    updateMyData={updateMyData}
                    skipReset={skipResetRef.current}
                    mode='approved'
                    loading={loading}
                  />
                ) : (
                  <Card>Looks like you have no comments on your site yet!</Card>
                )}
              </Card>
            </>
          )}
          {activeTab === 'held' && (
            <>
              <h1 className='m-none'>Held For Review</h1>
              <Spacer height={24} />
              <Card>
                {(comments && comments.length) || loading ? (
                  <CommentsTable
                    deleteComments={deleteComments}
                    approveComments={approveComments}
                    columns={columns}
                    data={loading ? dummyData() : formatCommentsHeld()}
                    updateMyData={updateMyData}
                    skipReset={skipResetRef.current}
                    mode='held'
                    loading={loading}
                  />
                ) : (
                  <Card>Looks like you have no comments on your site yet!</Card>
                )}
              </Card>
            </>
          )}
        </div>
      </Row>
    </span>
  );
};

const CommentWrapper = styled.div`
  // border: 2px solid ${(props) => props.theme.color.gray.two};
  padding: 12px;
  border-radius: 5px;
  margin: 0 0 16px;
  background: white;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray.three};
`;

const CommentTitle = styled(Link)`
  margin: 0;
  margin-bottom: 8px;
  text-decoration: none;
  color: ${(props) => props.theme.color.text.heading} !important;
  :hover {
    color: ${(props) => props.theme.color.primary.main} !important;
  }
`;

const Tabs = styled.div`
  width: 100%;
  position: relative;
`;

const Tab = styled.div`
  width: fit-content;
  width: 100%;
  display: block;
  padding: 8px 16px;
  border-radius: 5px;
  margin-right: 8px;
  transition-duration: 0.25s;
  background: ${(props) =>
    props.active ? props.theme.color.primary.backgroundDark : 'transparent'};
  color: ${(props) => (props.active ? 'white' : 'initial')};
  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.active
        ? `${props.theme.color.primary.backgroundDark}`
        : props.theme.color.gray.three};
    transition-duration: 0.25s;
  }
  svg {
    margin-right: 8px;
    color: inherit;
  }
  text-decoration: none;
`;

const APIKey = styled.p`
  margin-top: 4px;
  margin-bottom: 0;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray.three};
  padding: 12px;
  margin: 16px 0;
`;

const animation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const SlideWrapper = styled.div`
  animation: ${animation} 250ms ease-out;
`;

export default SiteComments;
