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

const SiteComments = () => {
  const { setEditModalOpen } = useContext(AppContext);
  const [reRender, setRender] = useState(false);
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('held-for-review')
      ? 'held'
      : 'published'
  );
  const [comments, setComments] = useState([]);

  const { state, q } = useContext(DatabaseContext);
  const { user, site, siteClient, userClient } = state;

  useEffect(() => {
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
        console.log('Comments from user: ', response.data);
        setComments(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // if (key) {
  //   serverClient
  //     .query(
  //       q.Map(
  //         q.Paginate(q.Match(q.Index('all_keys'))),
  //         q.Lambda(
  //           'keysRef',
  //           q.Let(
  //             {
  //               keys: q.Get(q.Var('keysRef')),
  //               user: q.Get(q.Select(['data', 'user'], q.Var('keys'))),
  //             },
  //             {
  //               user: q.Select(['data', 'name'], q.Var('user')),
  //               key: q.Select(['data', 'key'], q.Var('keys')),
  //             }
  //           )
  //         )
  //       ),
  //       { secret: key }
  //     )
  //     .then((keysResponse) => {
  //       console.log('Keys from user: ', keysResponse);
  //       setKeys(keysResponse.data);
  //     })
  //     .catch((keysError) => console.log(keysError));
  // } else {
  //   serverClient
  //     .query(
  //       q.Map(
  //         q.Paginate(q.Match(q.Index('all_keys'))),
  //         q.Lambda(
  //           'keysRef',
  //           q.Let(
  //             {
  //               keys: q.Get(q.Var('keysRef')),
  //               user: q.Get(q.Select(['data', 'user'], q.Var('keys'))),
  //             },
  //             {
  //               user: q.Select(['data', 'name'], q.Var('user')),
  //               key: q.Select(['data', 'key'], q.Var('keys')),
  //             }
  //           )
  //         )
  //       )
  //     )
  //     .then((keysResponse) => {
  //       console.log('Keys from all users: ', keysResponse);
  //     })
  //     .catch((keysError) => console.log(keysError));
  // }

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
          <SlideWrapper>
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
              <>
                {comments && comments.length ? (
                  <>
                    {comments.map((comment) => {
                      console.log(comment);

                      return (
                        <CommentWrapper key={`comment-${comment.data.name}`}>
                          <CommentTitle className='h3'>
                            {comment.data.name}
                          </CommentTitle>
                          <p>{shortenText(comment.data.comment, 100)}</p>
                          <small>- {comment.data.email}</small>
                        </CommentWrapper>
                      );
                    })}
                  </>
                ) : (
                  <Card>Looks like you have no comments on your site yet!</Card>
                )}
              </>
            )}
            {activeTab === 'held' && (
              <Card
                title='API Keys'
                subtitle='Your API keys grant access to all your comments. Keep them safe.'
              >
                {keys.map((key) => {
                  return (
                    <APIKey key={`api-key-${key.key}`}>
                      <strong>Key:</strong> {key.key}
                    </APIKey>
                  );
                })}
                {/* <Spacer /> */}
                <Button onClick={() => createAPIKey()} small>
                  Create New
                </Button>
              </Card>
            )}
          </SlideWrapper>
        </div>
      </Row>
    </span>
  );
};

const CommentWrapper = styled.div`
  // border: 2px solid ${(props) => props.theme.color.gray.two};
  padding: 12px;
  border-radius: 3px;
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
