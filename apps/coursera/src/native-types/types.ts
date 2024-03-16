import { CourseAttributes } from "types"

export interface courseFromDb extends CourseAttributes{
    adminId: string | null
    id: number
}