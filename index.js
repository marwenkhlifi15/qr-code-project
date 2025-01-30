
import fs from 'node:fs';
import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'type your URL here!',
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'are you sure?',
    },
  ])
  .then((answers) => {
    fs.writeFile('URL.txt', answers.url, "utf8",  (err) => {
        if (err) {
          console.error("Erreur lors de l'écriture du fichier :", err);
          return;
        }
        console.log("Le fichier a été écrit avec succès !");
      });
  });

fs.readFile('URL.txt', 'utf8',(err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      return;
    }
    var qr_png = qr.image(data, {type: 'png'});
    qr_png.pipe(fs.createWriteStream('qr-image.png'));

});
