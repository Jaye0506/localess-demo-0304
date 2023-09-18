/* tslint:disable */
/* eslint-disable */
import { SimpleUser } from '../models/simple-user';

/**
 * A GitHub repository.
 */
export interface SimpleRepository {

  /**
   * A template for the API URL to download the repository as an archive.
   */
  archive_url: string;

  /**
   * A template for the API URL to list the available assignees for issues in the repository.
   */
  assignees_url: string;

  /**
   * A template for the API URL to create or retrieve a raw Git blob in the repository.
   */
  blobs_url: string;

  /**
   * A template for the API URL to get information about branches in the repository.
   */
  branches_url: string;

  /**
   * A template for the API URL to get information about collaborators of the repository.
   */
  collaborators_url: string;

  /**
   * A template for the API URL to get information about comments on the repository.
   */
  comments_url: string;

  /**
   * A template for the API URL to get information about commits on the repository.
   */
  commits_url: string;

  /**
   * A template for the API URL to compare two commits or refs.
   */
  compare_url: string;

  /**
   * A template for the API URL to get the contents of the repository.
   */
  contents_url: string;

  /**
   * A template for the API URL to list the contributors to the repository.
   */
  contributors_url: string;

  /**
   * The API URL to list the deployments of the repository.
   */
  deployments_url: string;

  /**
   * The repository description.
   */
  description: null | string;

  /**
   * The API URL to list the downloads on the repository.
   */
  downloads_url: string;

  /**
   * The API URL to list the events of the repository.
   */
  events_url: string;

  /**
   * Whether the repository is a fork.
   */
  fork: boolean;

  /**
   * The API URL to list the forks of the repository.
   */
  forks_url: string;

  /**
   * The full, globally unique, name of the repository.
   */
  full_name: string;

  /**
   * A template for the API URL to get information about Git commits of the repository.
   */
  git_commits_url: string;

  /**
   * A template for the API URL to get information about Git refs of the repository.
   */
  git_refs_url: string;

  /**
   * A template for the API URL to get information about Git tags of the repository.
   */
  git_tags_url: string;

  /**
   * The API URL to list the hooks on the repository.
   */
  hooks_url: string;

  /**
   * The URL to view the repository on GitHub.com.
   */
  html_url: string;

  /**
   * A unique identifier of the repository.
   */
  id: number;

  /**
   * A template for the API URL to get information about issue comments on the repository.
   */
  issue_comment_url: string;

  /**
   * A template for the API URL to get information about issue events on the repository.
   */
  issue_events_url: string;

  /**
   * A template for the API URL to get information about issues on the repository.
   */
  issues_url: string;

  /**
   * A template for the API URL to get information about deploy keys on the repository.
   */
  keys_url: string;

  /**
   * A template for the API URL to get information about labels of the repository.
   */
  labels_url: string;

  /**
   * The API URL to get information about the languages of the repository.
   */
  languages_url: string;

  /**
   * The API URL to merge branches in the repository.
   */
  merges_url: string;

  /**
   * A template for the API URL to get information about milestones of the repository.
   */
  milestones_url: string;

  /**
   * The name of the repository.
   */
  name: string;

  /**
   * The GraphQL identifier of the repository.
   */
  node_id: string;

  /**
   * A template for the API URL to get information about notifications on the repository.
   */
  notifications_url: string;
  owner: SimpleUser;

  /**
   * Whether the repository is private.
   */
  private: boolean;

  /**
   * A template for the API URL to get information about pull requests on the repository.
   */
  pulls_url: string;

  /**
   * A template for the API URL to get information about releases on the repository.
   */
  releases_url: string;

  /**
   * The API URL to list the stargazers on the repository.
   */
  stargazers_url: string;

  /**
   * A template for the API URL to get information about statuses of a commit.
   */
  statuses_url: string;

  /**
   * The API URL to list the subscribers on the repository.
   */
  subscribers_url: string;

  /**
   * The API URL to subscribe to notifications for this repository.
   */
  subscription_url: string;

  /**
   * The API URL to get information about tags on the repository.
   */
  tags_url: string;

  /**
   * The API URL to list the teams on the repository.
   */
  teams_url: string;

  /**
   * A template for the API URL to create or retrieve a raw Git tree of the repository.
   */
  trees_url: string;

  /**
   * The URL to get more information about the repository from the GitHub API.
   */
  url: string;
}
