"use server"

import { redirect } from "next/navigation";
import { getServerSession } from "../../auth/actions";
import { getUserIdByInstallationId, getUserInstallationId } from "../../github/server/installation";
import { DASHBOARD_ROUTES } from "../../dashboard/lib/routes";
import { triggerRepoSync } from "../server/repo-sync";


export async function syncRepoCodebase(repoFullName: string, branch: string) {
  // Implement the logic to sync the codebase from the specified repository and branch
  // This could involve using Git commands or calling an external API to fetch the code
  // For example, you might use a library like simple-git or nodegit to perform the sync

  const session = await getServerSession();
  if (!session) {
    redirect('sign-in');
  }

  const installationId = await getUserInstallationId(session.user.id);

  if (!installationId) {
    redirect(DASHBOARD_ROUTES.github)
  }

  await triggerRepoSync(installationId, repoFullName, branch);

}