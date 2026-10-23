import { createConfirmation, getScheduleById, getTicketOptionsForRoute } from '../../models/model.js';
import { yenToUsd } from '../../includes/helpers.js';

/* Displays the booking page by retrieving the schedule & ticket options, then retrieves data to the ejs view */
const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;

    const schedule = await getScheduleById(scheduleId);

    const ticketOptions = await getTicketOptionsForRoute(schedule.routeId, scheduleId);

    res.render('routes/book', {
        title: 'Book Trip',
        schedule,
        ticketOptions,
        yenToUsd
    });
};

/* Processes the booking request and redirects to the confirmation page */
const processBookingRequest = async (req, res) => {
    const data = req.body;

    const confirmationNum = await createConfirmation(data);

    res.redirect(`/routes/confirmation/${confirmationNum}`);
};

export { bookingPage, processBookingRequest };