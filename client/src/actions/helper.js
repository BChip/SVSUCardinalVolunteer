export const filterpost = posting => posting.filter(vispostings => (vispostings.visible === false && vispostings.valid === false));
