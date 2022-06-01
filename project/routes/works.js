/**
 * Каталог
 */

import { Router } from "express";
const router = Router();

router.get("/works", function (req, res, next) {
    res.render("pages/works", {
        about: {
            heading: "Works",
            // img: "https://images.unsplash.com/photo-1545852528-fa22f7fcd63e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
        },
    });
});

export default router;
