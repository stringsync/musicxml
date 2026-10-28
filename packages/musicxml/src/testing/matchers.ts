import type { CustomMatcher } from 'bun:test';
import * as xml from '../lib/xml';

const VALIDATE_URL = 'http://xmlvalidator:8080/validate';

type ValidationResponse =
	| { code: 'OK'; error: null }
	| { code: 'BAD_REQUEST'; error: string }
	| { code: 'VALIDATION_ERROR'; error: string }
	| { code: 'ERROR'; error: string };

const validate = async (value: string): Promise<ValidationResponse> => {
	const res = await fetch(VALIDATE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: value,
	});
	return (await res.json()) as ValidationResponse;
};

export const toBeValidMusicXML: CustomMatcher<unknown, []> = async function (value) {
	if (typeof value !== 'string') {
		return { message: () => `expected a string, received ${this.utils.printReceived(value)}`, pass: false };
	}

	const validation = await validate(value);
	switch (validation.code) {
		case 'OK':
			return { message: () => `got unexpected success: code=${validation.code}`, pass: true };
		default:
			return { message: () => `${validation.code || 'UNKNOWN ERROR'}\n\n${validation.error}`, pass: false };
	}
};

const prettify = (xmlStr: string): string => {
	const xmlDocument = xml.parse(xmlStr);
	return xml.toString(xmlDocument);
};

const diffLines = (expected: string, received: string): string => {
	const expectedLines = expected.split('\n');
	const receivedLines = received.split('\n');
	const lengths = Array.from({ length: expectedLines.length + 1 }, () =>
		Array<number>(receivedLines.length + 1).fill(0),
	);

	for (let i = expectedLines.length - 1; i >= 0; i--) {
		for (let j = receivedLines.length - 1; j >= 0; j--) {
			lengths[i][j] =
				expectedLines[i] === receivedLines[j]
					? lengths[i + 1][j + 1] + 1
					: Math.max(lengths[i + 1][j], lengths[i][j + 1]);
		}
	}

	const lines: string[] = [];
	let i = 0;
	let j = 0;
	while (i < expectedLines.length && j < receivedLines.length) {
		if (expectedLines[i] === receivedLines[j]) {
			lines.push(`  ${expectedLines[i]}`);
			i++;
			j++;
		} else if (lengths[i + 1][j] >= lengths[i][j + 1]) {
			lines.push(`- ${expectedLines[i]}`);
			i++;
		} else {
			lines.push(`+ ${receivedLines[j]}`);
			j++;
		}
	}
	lines.push(...expectedLines.slice(i).map((line) => `- ${line}`));
	lines.push(...receivedLines.slice(j).map((line) => `+ ${line}`));
	return lines.join('\n');
};

export const toEqualXML: CustomMatcher<unknown, [expected: string]> = function (received, expected) {
	if (typeof received !== 'string') {
		return { message: () => `expected a string, received ${this.utils.printReceived(received)}`, pass: false };
	}

	const prettyReceived = prettify(received);
	const prettyExpected = prettify(expected);
	const pass = prettyReceived === prettyExpected;

	const message = pass
		? () =>
				this.utils.matcherHint('toEqualXML') +
				'\n\n' +
				`Expected: not ${this.utils.printExpected(prettyExpected)}\n` +
				`Received: ${this.utils.printReceived(prettyReceived)}`
		: () => `${this.utils.matcherHint('toEqualXML')}\n\nDifference:\n\n${diffLines(prettyExpected, prettyReceived)}`;

	return { message, pass };
};
