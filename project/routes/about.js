/**
 * О компании
 */

import { Router } from "express";
const router = Router();

router.get("/about", function (req, res, next) {
    res.render("pages/about", {
        about: {
            heading: "Hell",
            img: "https://images.unsplash.com/photo-1545852528-fa22f7fcd63e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
        },
    });
});

export default router;
