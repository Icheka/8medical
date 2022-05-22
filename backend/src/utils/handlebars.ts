import Handlebars from "handlebars";
import { keys } from "../keys";

export const registerHandlebarsHelpers = () => {
    const h = Handlebars;

    h.registerPartial("pdf-css-utilities", globalCSSUtilityClasses());
};

const globalCSSUtilityClasses = () => {
    return `<link href="${keys.APP_DOMAIN}/assets/css/pdf-utilities.css" rel="stylesheet" />`;
};
