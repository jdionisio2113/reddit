import fetch from "cross-fetch";

// User can select a subreddit to display
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

// “refresh” button to update it
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

// Request posts
export const REQUEST_POSTS = "REQUEST_POSTS";

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

// Recieve posts
export const RECIEVE_POSTS = "RECIEVE_POSTS";

export function recievePosts(subreddit, json) {
  return {
    type: RECIEVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    recievedAt: Date.now()
  };
}

// Thunk action creator
export function fetchPosts(subreddit) {
  return function(dispatch) {
    // API call starting
    dispatch(requestPosts(subreddit));

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        error => console.log("An error occured.", error)
      )
      .then(json =>
        // Update app state with results of API
        dispatch(receivePosts(subreddit, json))
      );
  };
}
