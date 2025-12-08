# Git and GitHub/GitLab

`git` is a version control system (VCS) that allows a user to modify files while retaining past versions of those files. GitHub and GitLab are websites that allow for extended VCS features especially suited to working with other contributors to a shared repository. For more information, it is highly recommended to see  the [official online book](https://git-scm.com/book/en/v2) on `git`, as well as the `git` manpages (which can be viewed by running `man git`), [GitHub documentation](https://docs.github.com/en) (especially [Git Basics](https://docs.github.com/en/get-started/git-basics/set-up-git) and [Using Git](https://docs.github.com/en/get-started/using-git/about-git)), and [GitLab documentation](https://docs.gitlab.com/) (especially [Getting started with Git](https://docs.gitlab.com/topics/git/get_started/) and [Basic Git operations](https://docs.gitlab.com/topics/git/basics/)).

> In the following guide, the main branch of local and remote repositories is called `master`, since this is the default for repositories on `git`. However, this can be changed as desired--often `main` is used instead. So when you see `master` in this guide, it is generally interchangeable with `main`.

## Initializing Git, Staging, Tagging, and Committing

In order to track and commit files with `git`, a `git` repository must be initialized in the project directory. Once a `git` repository has been initialized, files in the project directory can be created and changed and their changes tracked via `git`. In order to do so, changed files are staged for a commit and then committed, creating a snapshot of these files.

### Initializing a Local Git Repository

To [initialize](https://git-scm.com/book/ms/v2/Git-Basics-Getting-a-Git-Repository) a new `git` repository on your local machine in a project directory, first create the directory if it does not already exist and change to it:

```
mkdir <project_directory>
cd <project_directory>
```

where `<project_directory>` is the directory that will contain the project. Then initialize the `git` repository in the project directory:

```
git init
```

`git init` initializes the repository by creating a `.git` subdirectory that tracks file changes with each commit.

### Tracking and Staging Files

To track a new file for changes, it must be [staged](https://git-scm.com/book/ms/v2/Git-Basics-Recording-Changes-to-the-Repository) for the first time:

```
git add <file_name>
```

where `<file_name>` is the name of the file you want to track for changes. Multiple files can be listed at once (e.g. `git add <file_name_1> <file_name_2>`). Staging is also required before [committing](#committing-changes-to-files) changes to the file.

To view untracked files and staged files, run:

```
git status
```

To view differences between *unstaged* files and the files in the most recent commit on the current [branch](#branching), run:

```
git diff
```

To view differences between *staged* files and the files in the most recent commit on the current branch, run:

```
git diff --staged
```

> The `--cached` option can be used instead of `--staged` as these are equivalent.

### Tagging Files

To add an optional [tag](https://git-scm.com/book/ms/v2/Git-Basics-Tagging) to a commit (must be done *before* committing):

```
git tag <tag_name>
```

where `<tag_name>` is the name of the tag--for example, `v1.0.0`.

To list all tags:

```
git tag
```

### Committing Changes to Files

To [commit](https://git-scm.com/book/ms/v2/Git-Basics-Recording-Changes-to-the-Repository) changes to a tracked (i.e. previously staged) file that is not currently staged (that is, `git add` has not been run on the file since the last changes were made to the file or since the last commit was made), the modified files must first be staged via `git add` and then the changes committed via `git commit`:

```
git add <file_name>
git commit -m "<message>"
```

where `<file_name>` is the name of the file to commit and `<message>` is the commit message, which should be a description of the changes that are being committed. Note that `git add` stages the file for a commit and is necessary even if the file has previously been staged, unless the file is *currently* staged, since a file must be staged before its changes are committed. Once again, multiple files can be staged at once--i.e. `git add <file_name_1> <file_name_2>`.

However, using the `-a` option for `git commit`, all tracked files that have been changed since the last commit will be automatically staged, meaning that they do not need to be explicitly staged with `git add` prior to a commit:

```
git commit -a -m "<message>"
```

Note that when a new commit is created, it stores a pointer to the previous commit.

### Viewing Commit History

After committing, you can view the commit history in the `git` [log](https://git-scm.com/book/ms/v2/Git-Basics-Viewing-the-Commit-History):

```
git log
```

The output of this command, in part, will be similar to:

```
commit <commit_hash> (HEAD -> master, origin/master)
Author: <author_name> <<email_address>>
Date:   <date_time>

    <message>
```

where `<commit_hash>` is a hash of the commit, `<author_name>` is the name of the commit's author, `<email_address>` is the author's email address, `<date_time>` is the timestamp of the commit, and `<message>` is the commit message.

## GitIgnore File

A `.gitignore` file in the root of the repository contains a list of names, separated by a newline, of files and subdirectories in the project directory that should not be tracked. Files and directories added to the `.gitignore` file will be completely ignored by `git` after the `.gitignore` file has been committed--that is, `git` will not even show these files or directories as untracked when you run `git status`. Examples of files that should not be tracked include data files generated by the program or files with secrets such as API keys or passwords.

For example, suppose that a project directory contains a Python file `generate_data.py` that, when run, generates a subdirectory `data` containing CSV files `data0.csv` and `data1.csv`:

```
generate_data.py
data
    data0.csv
    data1.csv
```

To prevent `git` from showing these files as untracked when you run `git status`, create a `.gitignore` file in the project directory containing the following:

```
data
```

Now, `git` will not track `data` or any of the files contained within it and `git status` will not list these files or `data` as untracked.

It is recommended to track and stage the `.gitignore` file and then commit it:

```
git add .gitignore
git commit -m "add gitignore"
```

Committing the `.gitignore` file ensures that it does not show as untracked when you run `git status` and ensures that any others working on a shared repository have the same `.gitignore` file.

For more information, run `man gitignore` or see the online `.gitignore` [documentation](https://git-scm.com/docs/gitignore) or the [Ignoring Files](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) section of the `git` book.

## Branching

A [branch](https://git-scm.com/book/ms/v2/Git-Branching-Basic-Branching-and-Merging) is a pointer to a commit, so creating a new branch creates a new pointer to the commit at which the branching takes place--this commit will be the last common ancestor of the commits in each branch. When a new commit is then made on that branch, the branch pointer changes to point to this new commit, and the new branch and previous branch diverge. When working on a new feature or issue, it is common to create a new branch, switch to that branch, make changes to files, and commit those changes. You may then merge the changes into the main branch. To do so (here we will assume that our current branch is `master`, the main branch of the repository):

1. Create a new branch:

    ```
    git branch <new_branch>
    ```

    where `<new_branch>` is the name of the newly created branch.

1. Switch to the new branch:

    ```
    git checkout <new_branch>
    ```

1. Edit files.

1. Stage and commit changes:

    ```
    git commit -a -m "<message>"
    ```

The approach to merging the changes from the new branch into `master` will depend upon whether you are collaborating with others on a shared repository and, if not, whether you have a remote repository or just a repository on your local machine:

1. If you are not [collaborating with others](#collaborating-with-others-on-a-shared-repository-on-github-or-gitlab) on a shared repository and there is no [remote repository](#adding-a-local-repository-to-github-gitlab-or-another-server):

    1. Switch back to the previous branch, `master`:

        ```
        git checkout master
        ```

    1. Merge the changes from the new branch into `master`:

        ```
        git merge <new_branch>
        ```

        Handle any merge conflicts that may arise (see the [Basic Merge Conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) section of the `git` book) by editing the files with conflicts, then running

        ```
        git add <file_name>
        ```

        for each file with conflicts to mark the conflicts as resolved, since staging a file marks its conflicts as resolved. Again, multiple files can be staged at once (i.e. `git add <file_name_1> <file_name_2>`). Finally, commit the changes to complete the merge:

        ```
        git commit -a -m "<message>"
        ```

        Note that if there are no merge conflicts, then there is no need to run `git add` or `git commit`--simply running `git merge <new_branch>` is all that is necessary in this case.

1. If you are collaborating with others on a shared repository, see the section on [collaborating with others](#collaborating-with-others-on-a-shared-repository-on-github-or-gitlab). If you are the sole contributor to the repository and have a remote repository in addition to the repository on your local machine, you can choose whether to merge into `master` locally or via the pushing-directly approach discussed in the [collaborating with others](#collaborating-with-others-on-a-shared-repository-on-github-or-gitlab) section.

Additionally, as mentioned in the introduction, the main branch of a repository is not required to be named `master`, though this is the default name for the main branch on `git`. For example, `main` is used as the name of the main branch in many repositories. For information on changing the name of a branch, see the section [Changing the branch name](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management) and the section following it, Changing the master branch name, in the official `git` book.

> **Warning: Do not change the name of any branch in use by others. Never change the name of the main branch unless you are working on a new repository with no commits and no others have worked on the repository yet.**

## Stashing

If you have changed files on one branch and need to switch to another branch, you will need to either commit the changes or stash them. [Stashing](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning) allows you to save changes to files on a branch without committing them so that you can switch to another branch and return later to finish the changes and commit them.

To stash changes:

```
git stash
```

If you run `git status`, you will notice that it will tell you that there is nothing to commit and the working directory is clean, allowing you to switch to another branch if you want. To list all stashes:

```
git stash list
```

To reapply the changed files, run:

```
git stash apply
```

If there are multiple stashes, you can apply a specific stash by running:

```
git stash apply stash@{<stash_number>}
```

where `<stash_number>` is the number assigned to the stash visible in the output of `git stash list`. Note that while `git stash apply` will restore all changed files from the stash, it will not stage files automatically that were staged prior to the files being staged. To have `git stash apply` automatically restage previously staged files, use the `--index` option:

```
git stash apply --index
```

or

```
git stash apply --index stash@{<stash_number>}
```

To remove a stash from the stash list, run:

```
git stash drop stash@{<stash_number>}
```

where `<stash_number>` is the number assigned to the stash, visible in the output of `git stash list`. To reapply stashed files *and* remove stashed files from the stash list automatically after they have been reapplied, run:

```
git stash pop
```

with the optional `--index` option and `stash@{<stash_number>}` argument, just like `git stash apply`.

## Cloning a Repository from GitHub, GitLab, or Another Server

[Cloning](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) a repository copies a remotely hosted repository to your local machine. For example, to clone a repository hosted on GitHub to your local machine:

```
git clone git@github.com:<github_user_name>/<repository_name>.git
```

where `<github_user_name>` is the GitHub username of the project owner and `<repository_name>` is the name of the repository you want to clone. The SSH URI used above (`git@github.com:<github_user_name>/<repository_name>.git`) can also be obtained by navigating to the repository's URL (`https://github.com/<github_user_name>/<repository_name>`), clicking the `Code` button, clicking `SSH`, and then copying the SSH URI displayed. The process is similar for GitLab.

To list the remote repositories added to `git`:

```
git remote -v
```

The output may be similar to:

```
origin git@github.com:<github_user_name>/<repository_name>.git (fetch)
origin git@github.com:<github_user_name>/<repository_name>.git (push)
```

Note that `origin` is a name used by the `git` repository on your local machine to refer to the remote repository.

To update your local repository with changes from the remote repository, retrieve (fetch) the changes and then merge them into your current branch:

```
git fetch
git merge
```

These two commands can be combined with:

```
git pull
```

If you want to cancel a merge after running `git merge` or `git pull` (for example, if there are merge conflicts and you do not want to address them), run:

```
git merge --abort
```

## Adding a Local Repository to GitHub, GitLab, or Another Server

For the following steps, assume that a repository already exists on your local machine and at least one commit has been made to it. To add the local repository to GitHub (the following example uses GitHub, but the process is similar for GitLab or another server):

1. Create a new repository on [GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). Name the repository, add a description, and choose whether the repository will be public or private (this can always be changed later in the repository's settings). However, it is recommended not to add the suggested files (README, LICENSE, etc.) at this stage--these will be added later.

1. Add the remote repository to `git` locally:

    ```
    git remote add origin git@github.com:<github_user_name>/<repository_name>.git
    ```

    where `<github_user_name>` is the GitHub username of the project owner and `<repository_name>` is the name of the remote repository. The SSH URI used above (`git@github.com:<github_user_name>/<repository_name>.git`) can be obtained from the page presented after repository creation.

1. Push the changes from the local repository to the remote repository on GitHub:

    ```
    git push --set-upstream origin master
    ```

    Note that `--set-upstream origin master` will only need to be provided once, when pushing to the remote repository for the first time. After that, commits can be pushed to the remote repository by running:
    
    ```
    git push
    ```

> In the output of `git log` from the [Viewing Commit History](#viewing-commit-history) section, note that `HEAD` points to the current branch. `HEAD -> master, origin/master` signifies that `HEAD` is pointing to both the local `master` branch and the remote `master` branch. This indicates that the local `master` branch is up-to-date with the remote `master` branch. If you run `git status`, you will see `Your branch is up to date with 'origin/main'`.

## Forking a Repository on GitHub or GitLab

Forking a repository gives you your own copy of the original repository on GitHub or GitLab. This repository (fork) is independent of the original repository from which it was forked, though it can be synced with the original repository if desired (see below). See the GitHub [Fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo), GitHub [Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork), GitLab [Forks](https://docs.gitlab.com/user/project/repository/forking_workflow/), and GitLab [Update a fork](https://docs.gitlab.com/topics/git/forks/) documentation for more information.

The fork can be cloned to your local machine and changes on your local clone can then be pushed to the fork. After the changes have been pushed to the fork, you can open a pull request (called a merge request on GitLab) on the original repository to merge changes from a branch of the fork into a branch of the original repository. See the [GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) and [GitLab](https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/) documentation for more information.

Either the remote fork can be synced on GitHub or GitLab or the local clone can be synced and then the changes can be pushed to the remote fork. To accomplish the former, press the `Sync fork` button on GitHub or the `Update fork` button on GitLab, then make sure to pull (`git pull`) changes to your local clone of the fork; to accomplish the latter (here we use GitHub, but again the process is similar for GitLab):

1. Add the upstream (original) repository (i.e. the repository that was forked) to `git` on your local machine:

    ```
    git remote add upstream git@github.com:<github_user_name>/<repository_name>.git
    ```

    where `<github_user_name>` is the GitHub username of the project owner and `<repository_name>` is the name of the remote repository. The SSH URI used above (`git@github.com:<github_user_name>/<repository_name>.git`) can be obtained by navigating to the repository's URL (`https://github.com/<github_user_name>/<repository_name>`), clicking the `Code` button, clicking `SSH`, and then copying the SSH URI displayed.

    To list the remote repositories added to `git`:

    ```
    git remote -v
    ```

    The output may be similar to:

    ```
    origin git@github.com:<github_user_name_2>/<fork_name>.git (fetch)
    origin git@github.com:<github_user_name_2>/<fork_name>.git (push)
    upstream git@github.com:<github_user_name_1>/<original_repository_name>.git (fetch)
    upstream git@github.com:<github_user_name_1>/<original_repository_name>.git (push)
    ```

    Note that `upstream` is the local name for the original repository and `origin` is the local name for the fork.

1. Fetch changes from the upstream repository:

    ```
    git fetch upstream
    ```

1. Checkout the local `master` branch, if not already the current branch:

    ```
    git checkout master
    ```

1. Merge the changes from the `master` branch of the upstream repository with the local `master` branch:

    ```
    git merge upstream/master
    ```

    Handle any merge conflicts as needed (see [Branching](#branching)).

## CODEOWNERS File

The optional `CODEOWNERS` file can be used to restrict who may approve pull requests. To require approval of all pull requests on any branch by at least one individual listed in the `CODEOWNERS` file, set up the necessary [branch protection rule](#branch-protection-rules) and place the `CODEOWNERS` file in the root of the repository with the following format:

    ```
    *   @<username>
    ```

where `<username>` is the GitHub username of a user you have designated to approve pull requests (multiple can be specified on the same line, separated by a space).

For more information on the `CODEOWNERS` file, see the [GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) or [GitLab](https://docs.gitlab.com/user/project/codeowners/) documentation.

## Collaborating with Others on a Shared Repository on GitHub or GitLab

If you are creating a new shared repository, you may use either an organization or personal account to own this shared repository. See the GitHub [documentation](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations) on creating an organization for more information. This section uses GitHub, but the process will be similar for GitLab.

Two approaches to allowing individuals to contribute to the shared repository are described in the [Contribute](#contribute) section: pushing directly to the shared repository or forking it. The main difference between the two approaches is that the former necessarily allows contributors to create and overwrite branches while the latter, with the appropriate branch protection rules, does not. With either approach, the `master` branch can be protected to require reviews of all commits merged into it.

### Set Up the Remote Repository

If you are creating a new shared repository (if the repository has already been set up, proceed to the next section):

1. If you have not yet [initialized](#initializing-a-local-git-repository) a new local `git` repository inside a new project directory, do so.

1. Create files, [stage changed files](#tracking-and-staging-files), and [commit](#committing-changes-to-files), as needed, making sure to include a [README file](https://www.makeareadme.com/) (for example, a `README.md` file written in [Markdown](https://www.markdownguide.org/)), a [LICENSE file](https://choosealicense.com/) (for example, a `LICENSE.txt` file containing an [MIT License](https://choosealicense.com/licenses/mit/)), a `.gitignore` [file](#gitignore-file), and a `CODEOWNERS` [file](#codeowners-file) in the root of the repository, with the latter containing the email addresses of users who will have permission to approve pull requests.

1. [Create a remote repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) on GitHub using your personal account.

1. [Add the remote repository](#adding-a-local-repository-to-github-gitlab-or-another-server) to `git` on your local machine.

1. [Push](#adding-a-local-repository-to-github-gitlab-or-another-server) the changes from the local repository to the remote repository.

1. If you want to retain ownership of the repository using your personal account:

    1. In the repository's settings, add a classic [branch protection rule](#branch-protection-rules) to protect the `master` branch or all branches.

    1. Add individuals as [collaborators](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository) if the repository is private or if you want to enable contributors to push directly to the repository (instead of needing to fork it to contribute).

    If you want to transfer ownership of the remote repository to an organization on GitHub:

    1. Ensure that you are an [owner](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization) of the organization.

    1. [Transfer ownership](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository) of the remote repository to the organization.

    1. In the repository's settings, add a classic [branch protection rule](#branch-protection-rules) to protect the `master` branch or all branches.

    1. Add individuals as [members of your organization](https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization). [Give](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository) members [read access](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization) to the repository if you want to require them to fork the repository in order to contribute, or give them write access to the repository if you want them to be able to push directly to the repository to contribute.

### Contribute

As mentioned previously, two approaches that can be used to contribute to the shared repository are allowing contributors to push directly to the repository and requiring contributors to fork the repository. These two approaches are discussed below:

1. **Forking Approach (Recommended)**: To contribute via this approach, a contributor will fork the shared (upstream) repository, clone the fork locally, make changes to files on a non-`master` branch locally, push the changes to the fork, and open a pull request to merge the changes from the non-`master` branch on the fork into the `master` branch on the upstream repository.

    To contribute to the shared repository using the forking approach:

    1. [Fork](#forking-a-repository-on-github-or-gitlab) the shared repository.

    1. [Clone](#cloning-a-repository-from-github-gitlab-or-another-server) the fork onto your local machine.

    1. [Add the upstream repository](#forking-a-repository-on-github-or-gitlab) to `git`. To get changes from the upstream repository, either fetch and merge changes from the `master` branch of the upstream repository into the local `master` branch or sync the fork on GitHub and then fetch and merge the changes from the `master` branch of the fork into the local `master` branch.

    1. [Change](#branching) to a non-`master` branch on your local machine (create a new one if desired) to work on a new feature or issue.

    1. On the non-`master` branch, create files, [stage changes to files](#tracking-and-staging-files), and [commit](#committing-changes-to-files), as needed.

    1. [Push](#adding-a-local-repository-to-github-gitlab-or-another-server) the changes from the non-`master` branch on the local machine to the fork.

    1. Open a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) in the upstream repository to merge the changes from the non-`master` branch of the fork into the `master` branch of the upstream repository.

    1. After the pull request has been approved, either [fetch and merge](#forking-a-repository-on-github-or-gitlab) changes from the `master` branch of the upstream repository into the local `master` branch or sync the fork on GitHub and then [fetch and merge](#cloning-a-repository-from-github-gitlab-or-another-server) the changes from the `master` branch of the fork into the local `master` branch.

1. **Pushing-Directly Approach**: To contribute via this approach, a contributor will clone the shared (origin) repository, make changes to files on a non-`master` branch locally, push the changes to the origin, and open a pull request to merge the changes from the non-`master` branch of the origin repository into the `master` branch of the origin repository.

    To contribute to the shared repository using the pushing-directly approach:

    1. [Clone](#cloning-a-repository-from-github-gitlab-or-another-server) the shared repository onto your local machine.

    1. To get changes from the origin repository, [fetch and merge](#cloning-a-repository-from-github-gitlab-or-another-server) changes from the `master` branch of the origin repository into the local `master` branch.

    1. [Change](#branching) to a non-`master` branch locally (create a new one if desired) to work on a new feature or issue.

    1. On the non-`master` branch, create files, [stage changes to files](#tracking-and-staging-files), and [commit](#committing-changes-to-files), as needed.

    1. [Push](#adding-a-local-repository-to-github-gitlab-or-another-server) the changes from the non-`master` branch on the local machine to the origin repository.

    1. Open a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) in the origin repository to merge the changes from the non-`master` branch of the origin repository into the `master` branch of the origin repository.

    1. After the pull request has been approved, [fetch and merge](#cloning-a-repository-from-github-gitlab-or-another-server) changes from the `master` branch of the origin repository into the local `master` branch.

Note that a hybrid approach can also be used, by using [read/write permissions](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization) and [branch protection rules](#branch-protection-rules) to give specific individuals permission to push directly to the shared repository while requiring all others to fork in order to contribute. However, the forking approach is recommended for all contributors.

> You can also check out the collaboration documentation on [GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models) and in the official `git` [book](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project).

## Rebasing

Merging via `git merge` or a pull request (which performs a `git merge` on GitHub) is one way to combine changes from one branch into another and is usually the preferred approach for doing so. An alternative method is [rebasing](https://git-scm.com/book/ms/v2/Git-Branching-Rebasing), which takes the commits from one branch and makes them the base of the commits of the other that have been made since the branches diverged. For example, suppose that you create a new branch `new` off of `master`. You make several commits to `new` while your colleagues have merged several commits into `master` via pull requests. So now `master` is several commits ahead of where it was when you created `new`, and `new` has several commits of its own, none of which are in `master` yet.

While you could open a pull request to merge `new` into `master`, this would require someone with the requisite permission to merge the changes and handle any merge conflicts that may arise. To alleviate the work this person needs to do, you can merge the changes yourself on your local machine by rebasing. We do not typically want to merge changes from a non-`master` branch into the `master` branch on our local machine--this is best done by opening a pull request in either the origin repository (when using the pushing-directly approach to contributing) or upstream repository (when using the forking approach to contributing). Rebasing allows us to merge the changes locally so that when the pull request is performed on the `master` branch of the shared repository, there will be minimal or no merge conflicts for the pull request approver to take care of.

In this scenario, when the `new` branch is rebased using the `master` branch as its new base, the commits made to `new` since diverging from `master` are applied on top of the commits made to `master` since `new` diverged from it (in this case, that occured when `new` was created). Any merge conflicts that arise from attempting to apply the commits made to `new` on top of `master` are handled by you locally. Once these conflicts, if any, have been handled, the commits are merged and the rebasing is complete. Note that merging via `git merge` and merging via `git rebase` are different: `git merge` merges changes from two divergent branches into a single new commit, along with a new "merge commit", while `git rebase` applies commits made to one branch since a divergence on top of commits made to the other since the divergence, preserving the number of commits but fundamentally modifying the commits on the rebased branch (in our scenario above, `new`). Therefore, **rebasing should only be done locally to commits that have not yet been pushed**--a rebase should **never** be done to commits that have already been pushed, since this would fundamentally alter commits that others may be relying on in some way in the shared repository.

To rebase a branch with changes from the `master` branch (though any branch can be used, `master` is used for this example):

```
checkout master
git pull
checkout <non_master_branch>
git rebase master
```

where `<non_master_branch>` is the non-`master` branch to be rebased (such as the `new` branch from the previous discussion). At this point, the non-`master` branch can be pushed to the origin repository (if using the pushing-directly approach to contributing) or the upstream repository (if using the forking approach to contributing). If you are just working locally without a remote repository, or if you are the only person working on a remote repository, you can merge the rebased branch directly into `master`:

```
checkout master
git merge <non_master_branch>
```

As previously stated, merging via `git merge` when working on an unshared repository or via a pull request when working on a shared repository is typically preferred over merging via `git rebase`, but using `git rebase` can be used to assist pull request approvers by merging changes locally before opening a pull request.

## Branch Protection Rules

Branch protection rules are rules applied to a branch or set of branches with names matching a specified pattern (e.g. `master` to match a branch named `master` or `*` to match all branches) that restrict operations on those branches in some way to secure them. Branch protection rules can be applied to branches within a repository owned by either a personal or organization account. Though the following discussion describes setting up branch protection rules on GitHub, the process is similar for GitLab. See the documentation for [GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) or [GitLab](https://docs.gitlab.com/user/project/repository/branches/branch_rules/).

A good approach is to either protect all branches or only the `master` branch. Only protecting the `master` branch of the repository (whether `upstream` when using the forking approach or `origin` when using the pushing-directly approach) will require the use of pull requests in order to merge new commits into `master`, but it will allow contributors with write access (such as personal account collaborators or organization members with write access) to create and overwrite branches other than `master`. On the other hand, protecting all branches of the repository will prevent contributors with write access from creating new branches or overwriting existing branches (they can still do this on their own fork, of course). Note that protecting all branches will require the use of the forking approach to [contributing](#contribute), rather than the pushing-directly approach, since no contributor with write access will be able to create or overwrite a branch on the shared repository when all branches are protected.

> When using the forking approach to contributing to a repository on GitHub, if there are no collaborators (when the repository is owned by a personal account) or no organization members with write access except the owner (when the repository is owned by an organization account), all branches are protected by default since only the owner and collaborators (personal account) or organization members (organization account) can open a pull request on any branch of a repository, per the [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). However, it is still advised to add the branch protection rules that follow in case collaborators (personal account) or organization members with write access (organization account) are added to the repository in the future.

**To only protect the `master` branch:** In the [repository's settings](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule), add a classic branch protection rule. For the branch name pattern, use `master` to match the repository's `master` branch. Then select `Require a pull request before merging`, `Require approvals` (set number to the required number of reviewers), `Require review from Code Owners`, and, optionally, `Require signed commits` (see [Signing Commits and Tags using SSH](#signing-commits-and-tags-using-ssh)).

**To protect all branches:** In the [repository's settings](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule), add a classic branch protection rule. For the branch name pattern, use `*` to match all branches in the repository. Then select `Require a pull request before merging`, `Require approvals` (set number to the required number of reviewers), `Require review from Code Owners`, and, optionally, `Require signed commits` (see [Signing Commits and Tags using SSH](#signing-commits-and-tags-using-ssh)).

In fact, you can create both branch protection rules: one with a pattern `master` and another with a pattern `*`. However, since the [GitHub documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) states that a branch protection rule applying to a named branch has precedence over one applying to all branches via `*` and since only one branch protection rule can apply to any given branch, using both a branch protection rule matching `master` and one matching all branches means that only the rule with a pattern `master`, not the rule with a pattern `*`, will apply to `master`. This combination of rules can be used if you want to protect all branches but apply different protection rules to `master`.

> In an organization, we can optionally select `Restrict who can push to matching branches` and `Restrict pushes that create matching branches` to prevent new branch creation and overwriting via a `git push`, though this should already be accomplished by the `Require a pull request before merging`, `Require approvals`, and `Require review from Code Owners` options.

## Signing Commits and Tags using SSH

SSH can be used to sign Git commits or tags with your private key to prove the commits or tags are your own. For example, while a contributor to your repository could set their username and email address to your own, they would not be able to sign commits or tags with your SSH private key. Therefore, signing commits and tags is integral to ensuring that others cannot impersonate you in a repository.

### Git Setup

To enable Git commit and tag signing using SSH:

1. Configure Git to use SSH for commit signing instead of the default, GPG:

    ```
    git config --global gpg.format ssh
    ```

1. Configure Git to use the private key to use for commit signing:

    ```
    git config --global user.signingkey <private_key_path>
    ```

    where `<private_key_path>` is the full path (*not* relative path) to your private key, for example, `~/.ssh/id_ed25519`.
    
    > Note that documentation from [GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key#telling-git-about-your-ssh-key) and [GitLab](https://docs.gitlab.com/user/project/repository/signed_commits/ssh/) suggest providing the path to a public key instead. Per the `git` [documentation](https://git-scm.com/docs/git-config#Documentation/git-config.txt-usersigningKey), either the path to a private key or the path to a public key may be provided--if the path to a public key is provided, `ssh-agent` will be used to provide the associated private key:
    >
    > ```
    > If gpg.format is set to ssh this can contain the path to either your private ssh key or the public key when ssh-agent is used.
    > ```
    >
    > If you would rather provide the path to a public key and use `ssh-agent`, see the previously mentioned GitHub or GitLab documentation or run `man ssh-agent`.

1. Optionally, configure Git to sign commits and tags automatically:

    ```
    git config --global commit.gpgsign true
    git config --global tag.gpgsign true
    ```

    Alternatively, to sign an individual commit without setting up automatic commit signing:

    ```
    git commit -S -a -m "<message>"
    ```

    where `<message>` is the commit message. As you can see, this is our typical method for committing, with the addition of the `-S` option to sign the commit.

    To sign an individual tag without setting up automatic tag signing:

    ```
    git tag -s <tag_name>
    ```

    where `<tag_name>` is the name of the tag. As you can see, this is our typical method for creating a tag, with the addition of the `-s` option to sign the tag.

### GitHub or GitLab Setup

To enable GitHub or GitLab to verify signed Git commits and tags, add your SSH public key to your account as a signing key, per [GitHub's](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) or [GitLab's](https://docs.gitlab.com/user/ssh/#add-an-ssh-key-to-your-gitlab-account) documentation. For both GitHub and GitLab, you can use the same public key as both an authentication key and a signing key. For more information about signed commit and tag verification, see GitHub's documentation on [signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits), GitHub's documentation on [signing tags](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-tags), GitHub's documentation on [SSH commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#ssh-commit-signature-verification), GitLab's documentation on [signing commits with SSH keys](https://docs.gitlab.com/user/project/repository/signed_commits/ssh/), and GitLab's documentation on [using SSH keys](https://docs.gitlab.com/user/ssh/).

### Local Verification of Signed Commits and Tags

To enable signed commits and tags to be verified locally, such as when displayed with `git log --show-signature`, create an `allowed_signers` file and configure `git` to use it. The `allowed_signers` file can either be saved in `~/.ssh` and used globally--that is, for all `git` repositories--or be saved in the project directory and used locally--that is, only within the specified project. Both methods can be used so that the globally used `allowed_signers` file is used by default unless overriden by the locally used file. This approach is taken below:

1. Create an `allowed_signers` file that can be used globally, if one does not already exist:

    1. Create a file with the path `~/.ssh/allowed_signers` and add the following to it:

        ```
        <user_email_address> <public_key>
        ```

        where `<user_email_address>` is the email address associated with `git` and `<public_key>` is the public key (the content of the public key `.pub` file--for example, the content of `~/.ssh/id_ed25519.pub`). The option `namespaces="git"` may come after the user's email address and before the public key and is optional: using it restricts use of the public key to verify the user only when using `git`. You can remove the `namespaces="git"` option to allow the public key to be used to verify the user even when not using `git`. See the `ssh-keygen` [documentation](https://man7.org/linux/man-pages/man1/ssh-keygen.1.html#ALLOWED_SIGNERS) (or run `man ssh-keygen` and search for the `ALLOWED SIGNERS` section) and `git` [documentation](https://git-scm.com/docs/git-config#Documentation/git-config.txt-gpgsshallowedSignersFile) (or run `man git-config` and search for the `gpg.ssh.allowedSignersFile` section) for more information on the `allowed_signers` file.

    1. Add the `allowed_signers` file to `git` for global use:

        ```
        git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
        ```

        It is advisable to add only your own email address and public key to this file. For verification of `git` contributor's signed commits and tags, use a local file instead (see below).

1. Create an `allowed_signers` file that can be used locally (that is, in the current project directory, overriding any global `allowed_signers` file):

    1. Create a file named `allowed_signers` in the current project directory and add the following to it:

        ```
        <user_email_address> namespaces="git" <public_key>
        ```

        where `<user_email_address>` is the email address associated with `git` and `<public_key>` is the public key (the content of the public key `.pub` file--for example, the content of `~/.ssh/id_ed25519.pub`). Again, use of the `namespaces="git"` option is optional, but since this file will be only used by `git` it can be used.

        Add each `git` contributor's email and public key to the file, each on a new line, as shown above. Since this file overrides any global `allowed_signers` file, be sure to add your own email and public key to the file as well.

    1. Add the `allowed_signers` file to `git` for local use (that is, use within the current repository):

        ```
        git config gpg.ssh.allowedSignersFile <allowed_signers_file_path>
        ```

        where `<allowed_signers_file_path>` is the *full* path to the project's `allowed_signers` file.

    1. Optionally, track and commit the `allowed_signers` file:

        ```
        git add allowed_signers
        git commit -a -m "add allowed_signers file"
        ```

### Usage

If Git has not been configured to sign commits automatically (see above), then an individual commit may be signed by using the `-S` option with the typical method for committing:

```
git commit -S -a -m "<message>"
```

where `<message>` is the commit message.

If Git has been configured to sign commits automatically, then there is no need to use the `-S` option.

If Git has not been configured to sign tags automatically (see above), then an individual tag may be signed by using the `-s` option with the typical method for committing:

```
git tag -s <tag_name>
```

where `<tag_name>` is the name of the tag.

If Git has been configured to sign tags automatically, then there is no need to use the `-s` option.
