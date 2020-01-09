const run = async () => {
  try {
    const name = 'cv_johannroehl';
    const cv = require(`${__dirname}/${name}.json`);
    await require(`./src/index`).run(cv, `${__dirname}/${name}.pdf`);
  } catch (e) {
    console.error(e);
  }
};

run().catch(console.error);
