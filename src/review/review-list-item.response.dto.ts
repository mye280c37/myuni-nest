import { Review } from "./review.schema";

export const getReivewResponseDto = (review: Review, admin: Boolean): Review => {
    review.password = undefined;
    if(!admin) review.author = review.author.slice(0, 1) + '**';

    return review;
};