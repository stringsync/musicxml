import * as fs from 'fs';
import * as path from 'path';
import * as xml from '../xml';

(async () => {
  const xsdStr = fs.readFileSync(path.join(__dirname, '..', 'schemas', '4.0', 'musicxml.xsd')).toString();
  const xsd = xml.parse(xsdStr);
  const schema = xml.generate('4.0', xsd);
  console.log(JSON.stringify(schema, null, 2));
})();
