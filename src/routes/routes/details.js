import { getRouteById, getSchedulesByRoute } from '../../models/model.js';
import { monthToAbbreviation } from '../../includes/helpers.js';

/* Retrieves route details and schedules, then displays the route details page.*/
export default async (req, res) => {
    const { routeId } = req.params;
    const details = await getRouteById(routeId);
    details.schedules = await getSchedulesByRoute(routeId);

    // TODO: getCompleteRouteDetails instead

    res.render('routes/details', { 
        title: 'Route Details',
        details,
        monthToAbbreviation
    });
};