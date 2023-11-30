import AchievementPrerequisitesTreeRequest from "@/api/requests/_AchievementPrerequisitesTreeRequest";

export const getAchievementPrerequisites = async (achievement:any) => {
    const request = new AchievementPrerequisitesTreeRequest(achievement.id);

    await request.send();

    return request.response;
}
