# # Установка npm пакетов
# install:
# 		npm ci

# # Запуск программы gendiff
# gendiff:
# 		node bin/gendiff.js

# # Публикация npm пакета
# publish:
# 		npm publish --dry-run

# # Запуск линтера
# lint:
# 		npx eslint .

# # Запуск тестов
# test:
# 		npx jest

# # Команда покрытия
# test-coverage:
# 		npm run coverage

install: install-deps
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

test:
	npx jest

test-coverage:
	npx jest -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test