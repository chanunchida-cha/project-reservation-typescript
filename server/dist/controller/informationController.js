"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createInfoRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { partner_id, description, contact, address, type_rest, time_length, openday, rounds, } = req.body;
        const partnerId = mongoose.Types.ObjectId(partner_id);
        const image = req.file.filename;
        const restaurant = yield restaurants.create({
            partner_id: partnerId,
            description: description,
            contact: contact,
            address: address,
            type_rest: type_rest,
            time_length: time_length,
            openday: openday,
            rounds: rounds,
            image: image,
        });
        res.status(200).json(restaurant);
    }
    catch (err) {
        console.log(err);
    }
});
