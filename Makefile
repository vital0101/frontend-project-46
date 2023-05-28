# Установка npm пакета
install:
		npm ci

# Запуск программы gendiff
gendiff:
		node bin/gendiff.js

# Публикация npm пакета
publish:
		npm publish --dry-run