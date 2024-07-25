import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {action} from '@storybook/addon-actions'

import { Button } from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";


const meta: Meta<typeof AppWithRedux> = {
  // const meta: Объявляет константу meta.
  //   Meta<typeof AppWithRedux>: Указывает тип meta как Meta с параметром типа AppWithRedux. Meta - это интерфейс,
  //   который используется для определения метаданных истории в Storybook.
  //   =: Присваивает объект метаданных переменной meta.
    title: 'TODOLISTS/AppWithRedux', // Устанавливает заголовок истории в Storybook. Это путь, который будет отображаться в боковой панели Storybook, позволяя организовать истории в иерархии.
  component: AppWithRedux, // Указывает, что AppWithRedux является основным компонентом для этой истории. Storybook будет использовать этот компонент для рендеринга истории.
  parameters: {
    layout: 'centered', // Устанавливает параметр макета для Storybook. В данном случае компонент будет центрирован в Canvas Storybook. Это параметр оформления, который влияет на то, как компонент отображается в Storybook.
  },
  tags: ['autodocs'], // Добавляет тег autodocs, который указывает, что для этого компонента будет автоматически сгенерирована документация в Storybook. Это полезно для создания документации без необходимости ручного написания.
};

export default meta; // Экспортирует meta как экспорт по умолчанию. Это позволяет Storybook автоматически находить и использовать эти метаданные для настройки истории компонента AppWithRedux.
type Story = StoryObj<typeof AppWithRedux>;
// Объявляет тип Story, который будет использоваться для создания историй.
// StoryObj<typeof AppWithRedux> - это тип, который описывает объект истории для компонента AppWithRedux.
// StoryObj - это интерфейс, предоставляемый Storybook, который используется для типизации объектов историй.
//
// Этот код обеспечивает корректную настройку и типизацию компонента AppWithRedux для использования в Storybook,
// что упрощает его тестирование и документирование.


// В данном коде создается история для компонента `AppWithRedux` с использованием провайдера `Provider` из `react-redux`,
// чтобы обернуть компонент и передать ему Redux store.
export const AppWithReduxStory: Story = {
  render: ()=> <Provider store={store}><AppWithRedux/></Provider>
};


// Разберем каждую строку:
//
// export const AppWithReduxStory: Story = {
//   render: () => <Provider store={store}><AppWithRedux/></Provider>
// };
// ```
//
// 1. **`export const AppWithReduxStory: Story = {`:**
//
// Эта строка объявляет и экспортирует константу `AppWithReduxStory`. Эта константа имеет тип `Story`, что указывает на то,
//     что она представляет собой историю компонента для использования с инструментами, в нашем случае Storybook.
//
// 2. **`render: () => <Provider store={store}><AppWithRedux/></Provider>`:**
//
// - **`render:`**: Эта часть кода определяет свойство `render` объекта `AppWithReduxStory`. Это свойство содержит функцию,
//     которая рендерит компонент.
//
// - **`() => <Provider store={store}><AppWithRedux/></Provider>`**: Стрелочная функция, которая возвращает JSX-элемент.
//
// - **`<Provider store={store}>`**: `Provider` - это компонент из библиотеки `react-redux`. Он используется для того,
//     чтобы предоставить Redux store всему дереву компонентов ниже него. Здесь `store` - это объект хранилища (store),
//     который был ранее создан и настроен.
//
// - **`<AppWithRedux/>`**: Это компонент, который будет обернут в `Provider`, чтобы иметь доступ к Redux store.
//
//     В итоге, стрелочная функция возвращает компонент `AppWithRedux`, обернутый в `Provider` с переданным `store`,
//     что позволяет `AppWithRedux` и всем его дочерним компонентам получать доступ к Redux store.
//
//     Таким образом, этот код создает историю для компонента `AppWithRedux`, обеспечивая его доступ к Redux store
// через `Provider`. Это особенно полезно в контексте тестирования и разработки с использованием инструментов,
//     таких как Storybook, где необходимо видеть компонент в изоляции, но в контексте реального окружения приложения.


