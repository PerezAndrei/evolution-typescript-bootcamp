import axios from "axios";
import { randomCellsURL } from "../Helpers/Constants";
import { HexagonCell } from "../Types/HexagonTypes";

export function getRandomData(cells: Array<HexagonCell>, size: number):Promise<Array<HexagonCell>>{    
    console.log("getRandomData");
    console.log(cells);
    console.log(size);

    return axios.post<Array<HexagonCell>>(`${randomCellsURL}${size}`, cells).then(result=>{
        return result.data;
    })
}