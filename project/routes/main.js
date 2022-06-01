/**
 * В курсе владилена подключают Vie и выносят колбэк с изображениями в отдельный модуль для обработки данных с сервера
 */

import { Router } from "express";
const router = Router();

router.get("/", function (req, res, next) {
    res.render("pages/main", {
        home: {
            heading: "Mainnnnnn",
            img: "img/bg.jpg",
        },
    });
});

export default router;
