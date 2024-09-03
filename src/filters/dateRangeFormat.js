/*
@author Alireza Jahedi
*/
import moment from "@nextcloud/moment";
import jMoment from "moment-jalaali";
import { translate as t } from "@nextcloud/l10n";

/**
 * Formats a date-range depending on the user's current view
 *
 * @param {string | Date} value The date to format
 * @param {string} view The current view of the user
 * @param {string} locale Which locale to format it in
 * @return {string}
 */
export default (value, view, locale) => {
	switch (view) {
		case "timeGridDay":
			return jMoment(value).locale(locale).format("jYYYY/jMM/jDD");

		case "timeGridWeek":
			return t("calendar", "Week {number} of {year}", {
				number: moment(value).locale(locale).week(),
				year: jMoment(value).locale(locale).format("jYYYY"),
			});

		case "multiMonthYear":
			return jMoment(value).locale(locale).format("jYYYY");

		case "dayGridMonth":
		case "listMonth":
		default:
			return jMoment(value).locale(locale).format("jMMMM jYYYY");
	}
};
