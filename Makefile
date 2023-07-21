# Установка npm пакетов
install:
		npm ci

# Запуск программы gendiff
gendiff:
		node bin/gendiff.js

# Публикация npm пакета
publish:
		npm publish --dry-run

# Запуск линтера
lint:
		npx eslint .

# Запуск тестов
test:
		npm test

# Команда покрытия
test-coverage:
		npx jest --coverage
