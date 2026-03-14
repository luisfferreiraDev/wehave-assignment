export const formatShortDate = (date: Date, locale = 'en-GB'): string => {
	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short'
	}).format(date);
};

export const formatDateWithYear = (date: Date, locale = 'en-GB'): string => {
	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(date);
};

export const formatTime = (date: Date, locale = 'en-GB'): string => {
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);
};
