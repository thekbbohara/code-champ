import request, { METHOD_TYPE } from "@/axios/requests";

export const purchaseToken = async ({
  token,
  userId,
}: {
  token: number;
  userId: string;
}) => {
  try {
    const response = await request({
      url: "/tokens/purchase",
      method: METHOD_TYPE.POST,
      data: JSON.stringify({ token, userId }),
    });

    const data = response.data;

    if (!data.success) {
      throw new Error(data.error || "Failed to purchase tokens");
    }

    return { msg: "Token purchased successfully", data };
  } catch (error) {
    console.error("Error purchasing token:", error);
    throw error;
  }
};

export const createArena = async ({
  userId,
  entryToken,
  title,
  config,
}: {
  userId: string;
  config: {
    playerMode: "1v1" | "multiplayer";
    language: "javascript" | "python";
  };
  title: string;
  entryToken: number;
}) => {
  try {
    const { data } = await request({
      url: "/room",
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        userId,
        entryToken,
        title,
        config,
      }),
    });
    console.log({ data });
    if (!data.success) {
      throw new Error(data.error || "Failed to create arena");
    }

    return data.room;
  } catch (error) {
    console.error("Error creating arena:", error);
    throw error;
  }
};
export const getArena = async ({ cuid }: { cuid: string }) => {
  const { data } = await request({
    url: `/room/${cuid}`,
    method: METHOD_TYPE.GET,
  });
  return data;
};
export const getUserArenas = async ({ userId }: { userId: string }) => {
  const { data } = await request({
    url: `/room?createdby=${userId}`,
    method: METHOD_TYPE.GET,
  });
  return data;
};
