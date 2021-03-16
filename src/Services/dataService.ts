import axios from "axios";
import { randomCellsURL } from "../Helpers/Constants";
import { HexagonCell } from "../Types/HexagonTypes";

export function getRandomData(cells: Array<HexagonCell>, size: number):Promise<Array<HexagonCell>>{  
    return axios.post<Array<HexagonCell>>(`${randomCellsURL}${size}`, cells).then(result=>{
        return result.data;
    })
}