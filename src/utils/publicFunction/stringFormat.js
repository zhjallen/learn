// È¥³ý×Ö·û´®Ç°ºó¿Õ¸ñ
export function trim(string) {
	if (typeof string === "string") {
		if (string.match(/^\s*$/)) {
			return "";
		}
		return /^\s*(.*?)\s*$/g.exec(string)[1];
	}
	return string;
}