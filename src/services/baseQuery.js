import httpRequest from "@/utils/httpRequest";

const baseQuery = async (args) => {
  try {
    const {
      url,
      method = "GET",
      body,
      params,
    } = typeof args === "string" ? { url: args } : args;

    const result = await httpRequest({
      url,
      method,
      data: body,
      params,
    });

    return { data: result.data || result };
  } catch (error) {
    const formattedError = {
      status: error.response?.status,
      data: error.response?.data || error.message,
    };
    console.log(formattedError);

    return {
      error: formattedError,
    };
  }
};

export default baseQuery;
