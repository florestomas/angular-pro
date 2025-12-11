import { sleep } from '@helpers/sleep';
import { GitHubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment.development';
import { GitHubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueByNumber = async (issueNumber: string): Promise<GitHubIssue> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw 'Cant load issue';

    const issue: GitHubIssue = await resp.json();
    console.log(issue);

    return issue;
  } catch (error) {
    throw 'Cant load labes';
  }
};
