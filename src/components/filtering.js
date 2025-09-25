import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement("option"); // @todo: создать и вернуть тег опции
                        option.value = name;
                        option.textContent = name;
                        return option;                  
                      })
        )
     })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.type === 'clear') {
            const field = action.field;
            
            const parent = action.element.closest('.filter-item, .filter-group, [data-field-container]') || action.element.parentElement;
            const input = parent.querySelector('input[type="text"], input[type="search"], input[type="number"], select');
            
            if (input) {
                input.value = '';
                
                if (state.filters && state.filters[field] !== undefined) {
                    state.filters[field] = '';
                }
            }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}