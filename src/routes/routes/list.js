import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const allRoutes = await getAllRoutes();
    const seasons = await getListOfSeasons();
    const query = req.query;

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