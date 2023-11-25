import AchievementPrerequisitesViewRequest from "@/api/requests/AchievementPrerequisitesTreeRequest";

export const getAchievementPrerequisites = async (achievement:any) => {
    const request = new AchievementPrerequisitesViewRequest(achievement.id);

    await request.send();

    return request.response;
}
