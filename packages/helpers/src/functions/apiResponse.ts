import { ApiResponseAttributes } from "types"

export const apiResponse = (response?: ApiResponseAttributes, status?: number) => {
    return Response.json(response, { status })
}

