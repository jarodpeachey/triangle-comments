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

const SiteComments = ({ loadedComments, setLoadedComments }) => {
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('held-for-review')
      ? 'held'
      : 'published'
  );
  const [comments, setComments] = useState([]);
  const [commentsToShow, setCommentsToShow] = useState(comments);
  const [loading, setLoading] = useState(
    !(loadedComments && loadedComments.length > 0)
  );
  const [showItems, setShowItems] = useState(
    loadedComments && loadedComments.length > 0
  );
  const [animate, setAnimate] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [reRender, setRender] = useState(true);

  const { state, q } = useContext(DatabaseContext);
  const { user, site, siteClient, userClient } = state;

  useEffect(() => {
    console.log(loadedComments);
    if (loadedComments && loadedComments.length > 0) {
      setComments(loadedComments);
    } else {
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
                  user: q.Select(['ref'], q.Var('user')),
                  site: q.Select('ref', q.Var('site')),
                  data: q.Select(['data'], q.Var('comments')),
                }
              )
            )
          )
        )
        .then((response) => {
          console.log('Comments from site: ', response.data);
          setComments(response.data);
          setCommentsToShow(response.data);
          setLoadedComments(response.data);
          setTimeout(() => {
            setShowItems(true);
            setAnimate(true);
            // setTimeout(() => {
            setAnimateItems(true);
            // }, 200);
            // setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
            // }, 200);
          }, 200);
        })
        .catch((error) => {
          console.log(error);
          setShowItems(true);
          setAnimate(true);
          setTimeout(() => {
            setAnimateItems(true);
          }, 200);
          setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
          }, 200);
        });
    }
  }, [loadedComments]);

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
                  user: q.Select(['ref'], q.Var('user')),
                  site: q.Select('ref', q.Var('site')),
                  data: q.Select(['data'], q.Var('comments')),
                }
              )
            )
          )
        )
        .then((response) => {
          console.log('Comments from site: ', response.data);
          setComments(response.data);
          setCommentsToShow(response.data);
          setLoadedComments(response.data);
          setTimeout(() => {
            setShowItems(true);
            setAnimate(true);
            // setTimeout(() => {
            setAnimateItems(true);
            // }, 200);
            // setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
            // }, 200);
          }, 200);
        })
        .catch((error) => {
          console.log(error);
          setShowItems(true);
          setAnimate(true);
          setTimeout(() => {
            setAnimateItems(true);
          }, 200);
          setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
          }, 200);
        });
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
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes',
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

  const formatComments = () => {
    const newComments = [];
    commentsToShow &&
      commentsToShow.length > 0 &&
      commentsToShow.forEach((comment) => {
        newComments.push({
          name: comment.data.name,
          comment: shortenText(comment.data.comment, 50),
          date: comment.data.date,
          path: comment.data.path || '/',
          status: comment.data.draft ? 'Draft' : 'Published',
        });
      });

    return newComments;
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
                    `/dashboard/sites/${site.id}/comments/published`
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
                    `/dashboard/sites/${site.id}/comments/held-for-review`
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
            // <Card title='Account'>
            //   <p className='small m-none'>
            //     Name: {user.data.name || 'Guest'}
            //   </p>
            //   <p className='small m-none'>Email: {user.data.email}</p>
            //   <Spacer />
            //   <Button onClick={() => openEditModal(true)} gray small>
            //     Edit
            //   </Button>
            // </Card>
            <Card title='Comments'>
              {comments && comments.length ? (
                <CommentsTable
                  columns={columns}
                  data={formatComments()}
                  updateMyData={updateMyData}
                  skipReset={skipResetRef.current}
                />
              ) : (
                <Card>Looks like you have no comments on your site yet!</Card>
              )}
            </Card>
          )}
          {activeTab === 'held' && <h1>Held For Review</h1>}
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
  border-radius: 50px;
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
