import { takeLatest, takeEvery } from 'redux-saga/effects';

import * as postActions from '../actions/posts';
import * as userActions from '../actions/users';
import * as authActions from '../actions/auth';
import { fetchPostsSaga, updatePostSaga, deletePostSaga, createPostSaga } from './posts';
import {
  fetchUsersSaga,
  fetchUserSaga,
  updateUserSaga,
  deleteUserSaga,
  createUserSaga,
} from './users';
import { fetchAuthSaga } from './auth';
export default function* mySaga() {
  // posts
  yield takeLatest(postActions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(postActions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(postActions.updatePost.updatePostRequest, updatePostSaga);
  yield takeLatest(postActions.deletePost.deletePostRequest, deletePostSaga);
  // users
  yield takeLatest(userActions.getUsers.getUsersRequest, fetchUsersSaga);
  yield takeLatest(userActions.getUser.getUserRequest, fetchUserSaga);
  yield takeLatest(userActions.createUser.createUserRequest, createUserSaga);
  yield takeLatest(userActions.updateUser.updateUserRequest, updateUserSaga);
  yield takeLatest(userActions.deleteUser.deleteUserRequest, deleteUserSaga);
  //auth
  yield takeLatest(authActions.getAuth.getAuthRequest, fetchAuthSaga);
}
