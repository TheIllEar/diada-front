/**
 * Карточка
 */

import { Router } from "express";
const router = Router();
const card = 'card'; // Подставлять ЧПУ

// В ссылки подставлять id или ЧПУ проекта, типо card/3 
// Далее получить список всех проектов и перебрать через forEach, подставляя каждому в render путь со своим id/ЧПУ

router.get(`/works/${card}`, function (req, res, next) {
    res.render("pages/card", {
        about: {
            heading: "Catalog",
            // img: "https://images.unsplash.com/photo-1545852528-fa22f7fcd63e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
        },
    });
});

export default router;
