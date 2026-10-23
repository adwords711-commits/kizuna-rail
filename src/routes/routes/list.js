import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

/* Retrieves routes, regions, and seasons, filters routes by selected criteria and renders to routes page */
export default async (req, res) => {
    const regions = await getListOfRegions();
    const allRoutes = await getAllRoutes();
    const seasons = await getListOfSeasons();
    const query = req.query;
    /* Array |filer () method Filters routes by regions, season or both using query params */
    const routes = allRoutes.filter(route => {
        const matchesRegion = !query.region || query.region === 'all' || route.region === query.region;
        const matchesSeason = !query.season || query.season === 'all' || route.bestSeason === query.season;

        return matchesRegion && matchesSeason;
    })

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query
    });
};