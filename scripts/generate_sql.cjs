const fs = require('fs');
const path = require('path');

function generateSqlFile() {
    // This path is relative to the script's location in vue-app/scripts/
    const jsonFilePath = path.join(__dirname, '../../../电子书合集/poet.song.1000.json');
    const sqlFilePath = path.join(__dirname, 'insert_poems.sql');

    try {
        console.log(`Reading JSON file from: ${jsonFilePath}`);
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        const poems = JSON.parse(data);
        console.log(`Successfully parsed ${poems.length} poems from JSON file.`);

        const poemsToInsert = poems.slice(0, 200);

        if (poemsToInsert.length === 0) {
            console.log('No poems to insert.');
            return;
        }

        let sql = 'INSERT INTO poems (title, author, dynasty, content) VALUES ';

        const values = poemsToInsert.map(poem => {
            const title = poem.title ? poem.title.replace(/'/g, "''") : '无题';
            const author = poem.author ? poem.author.replace(/'/g, "''") : '佚名';
            const dynasty = '宋代'; // Assuming from filename "poet.song"
            const content = poem.paragraphs ? poem.paragraphs.join('。').replace(/'/g, "''") : '';
            
            return `('${title}', '${author}', '${dynasty}', '${content}')`;
        });

        sql += values.join(',\n') + ';';

        fs.writeFileSync(sqlFilePath, sql, 'utf8');
        console.log(`Successfully generated SQL for ${poemsToInsert.length} poems at: ${sqlFilePath}`);

    } catch (error) {
        console.error('An error occurred while generating the SQL file:', error);
    }
}

generateSqlFile();