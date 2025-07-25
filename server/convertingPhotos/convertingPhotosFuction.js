const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

const sourceDir = path.resolve(__dirname, '../foto')
const destinationDir = path.resolve(__dirname, '../static')

function copyPhotos() {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error('Ошибка при чтении папки:', err)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(sourceDir, file)
      const fileExt = path.extname(file).toLowerCase()

      if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExt)) {
        const fileName = uuid.v4() + fileExt

        const destinationPath = path.join(destinationDir, fileName)

        fs.copyFile(filePath, destinationPath, (err) => {
          if (err) {
            console.error(`Ошибка при копировании файла ${file}:`, err)
          } else {
            console.log(`Файл ${file} скопирован как ${fileName}`)
          }
        })
      }
    })
  })
}

// Запускаем функцию
copyPhotos()
