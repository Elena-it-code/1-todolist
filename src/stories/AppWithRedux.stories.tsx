import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "../state/store";
import {Provider} from "react-redux";
import AppWithRedux from "../AppWithRedux";
import {Meta, StoryObj} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";




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
  decorators: [ReduxStoreProviderDecorator], // пробросили наш HOC для компоненты
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
export const AppWithReduxStory: Story = {};







