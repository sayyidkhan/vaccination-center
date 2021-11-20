import {Body, Controller, Get, Post} from "@nestjs/common";
import {CatService} from "./cat.service";
import {Cat} from "./schema/cat.schema";


@Controller("cat")
export class CatController {
    constructor(private readonly catService : CatService) {}

    @Post("/create_new")
    async createNewCat(@Body() dto: Cat) : Promise<Cat> {
        const cat : Cat = await this.catService.create(dto);
        if(cat !== undefined){
            return cat;
        }
        else {
            return null;
        }
    }

}
