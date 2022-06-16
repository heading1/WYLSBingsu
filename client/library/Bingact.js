// poly-fill
window.requestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    const start = Date.now();

    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id);
  };

let styledObj = {};
const style = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(style);

function createElement(type, props, ...children) {
  const isStyledComponent = typeof type === 'object';

  if (isStyledComponent) {
    const componentStyled = type.componentStyle;
    const styledClassName = componentStyled.componentId;
    styledObj[styledClassName] = componentStyled.rules[0];

    // style.type = 'text/css';
    let styleCSS = '';
    for (const key in styledObj) {
      styleCSS += `.${key} {${styledObj[key]}}\n`;
    }
    style.insertAdjacentHTML('beforeend', styleCSS);
    // stlyed외에 직접 클래스 추가한 경우
    const className = props?.className ? props.className + ' ' + styledClassName : styledClassName;
    props = {
      ...props,
      className,
    };
  }

  return {
    type: isStyledComponent ? type.target : type,
    props: {
      ...props,
      children: children.flat().map((child) => (typeof child === 'object' ? child : createTextElement(child))),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);

  return dom;
}

let nextUnitOfWork = null; // 다음 단위 작업
let wipRoot = null;
let currentRoot = null;
let deletions = null; // 오래된 노드 삭제하기 위한 배열

const isEvent = (key) => key.startsWith('on'); // 이벤트 리스너 처리
const isStyle = (key) => key === 'style';
const isProperty = (key) => key !== 'children' && !isEvent(key) && !isStyle(key);
const isNew = (prevProps, nextProps) => (key) => prevProps[key] !== nextProps[key];
const isGone = (nextProps) => (key) => !(key in nextProps);

function updateDom(dom, prevProps, nextProps) {
  // 이벤트 리스너의 변경 시 삭제
  Object.keys(prevProps)
    .filter(isEvent) // old fiber의 이벤트 목록
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key)) // old fiber의 이벤트가 삭제,변경됐는지 검사
    .forEach((name) => {
      // 변경되었다면 old fiber에 등록된 이벤트 삭제
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  const prevStyle = prevProps.style || {};
  const nextStyle = nextProps.style || {};

  // Remove old styles
  Object.keys(prevStyle)
    .filter(isGone(nextStyle))
    .forEach((name) => {
      dom.style[name] = '';
    });

  // Set new or changed styles
  Object.keys(nextStyle)
    .filter(isNew(prevStyle, nextStyle))
    .forEach((name) => {
      dom.style[name] = nextStyle[name];
    });
  // 이벤트 리스너를 제외한 old props(속성) 삭제
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach((name) => {
      dom[name] = '';
    });
  // 새로운 props중 props만 (이벤트, child 제외하고) 추가
  Object.keys(nextProps) // 다음 속성
    .filter(isProperty) // props(속성)인지
    .filter(isNew(prevProps, nextProps)) // 새로운 속성인지
    .forEach((name) => {
      dom[name] = nextProps[name]; // 새로운 속성만 dom에 추가
    });

  // 새로운 이벤트 리스너 등록
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
function cancelEffects(fiber) {
  if (fiber.hooks) {
    fiber.hooks
      .filter((hook) => hook.tag === 'effect' && hook.cancel)
      .forEach((effectHook) => {
        effectHook.cancel();
      });
  }
}

function runEffects(fiber) {
  if (fiber.hooks) {
    fiber.hooks
      .filter((hook) => hook.tag === 'effect' && hook.effect)
      .forEach((effectHook) => {
        effectHook.cancel = effectHook.effect();
      });
  }
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  // 함수형 컴포넌트가 적용되면서 DOM 노드가 없는 fiber를 가지기 때문에 이를 구별해야한다.
  // const domParent = fiber.parent.dom;
  let domParentFiber = fiber.parent;
  // DOM 노드의 부모를 찾으려면 DOM 노드를 가진 fiber를 찾을 때까지 fiber 트리의 상단으로 올라간다.
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  // fiber의 태그로 구별
  if (fiber.effectTag === 'PLACEMENT') {
    if (fiber.dom != null) {
      // 부모 fiber 노드에 자식 DOM 노드를 추가
      domParent.appendChild(fiber.dom);
    }
    runEffects(fiber);
  } else if (fiber.effectTag === 'UPDATE') {
    cancelEffects(fiber);
    if (fiber.dom != null) {
      // 이미 존재하는 DOM 노드를 변경된 props로 갱신
      updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    }
    // dom의 순서를 못지키는 버그로 작성했으나 useEffect 적용과정에서 버그 발생하여 주석처리
    // domParent.appendChild(fiber.dom); // appendChild() move this element after the updated element
    runEffects(fiber);
  } else if (fiber.effectTag === 'DELETION') {
    // 자식을 부모 DOM에 제거
    // domParent.removeChild(fiber.dom);
    // 함수형 컴포넌트가 적용되면서 DOM 노드를 가진 자식을 찾을 때 까지 찾는다.
    cancelEffects(fiber);
    commitDeletion(fiber, domParent);
    return; // fiber가 삭제되므로 아래 fiber의 형제,자식 commitWork는 하면 안됨
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

function render(element, container) {
  // 1. 렌더 실행 시 다음 단위 작업에 루트 fiber 설정
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, // 이전 커밋 단계에서 DOM에 추가했던 fiber에 대한 링크
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function workLoop(deadline) {
  let shouldYield = false;
  // 2. 단위 작업이 있고 현재 작업의 시간이 남아있을때
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; // requestIdleCallback에서 주는 콜백으로 작업 남은 시간을 가져올 수 있다
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  // setTimeout과 같읕 개념이다. 실행시점이 setTimeout이 시간이 끝날 때라면 requestIdleCallback 은 메인스레드가 대기 상태일 때 콜백을 실행한다.
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop); //workLoop 실행하며 단위작업을 수행한다.

function performUnitOfWork(fiber) {
  // 함수형 컴포넌트에서 만들어진 fiber는 DOM 노드가 없고 children을 props에서 직접 가져오는 대신 함수를 실행하여 얻는다.
  // 이를 판별하는 조건문을 만든다.
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    // 함수형 컴포넌트라면
    updateFunctionComponent(fiber);
  } else {
    // 함수형 컴포넌트가 아니라면
    updateHostComponent(fiber);
  }

  if (fiber.child) {
    return fiber.child;
  }
  // 현재 fiber가 자식 fiber가 없다면
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      // 형제 fiber가 있다면
      // 현재 fiber의 형제 fiber 반환 -> 다음 단위 작업 등록
      return nextFiber.sibling;
    }
    // 현재 fiber가 자식fiber와 형제 fiber도 없다면 부모 fiber를 다음 fiber로 등록
    nextFiber = nextFiber.parent;
  }
}

let wipFiber = null;
let hookIndex = null;

function updateFunctionComponent(fiber) {
  // useState 내부에서 사용하기 위한 전역 변수를 초기화한다.
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = []; // hooks 배열을 추가함으로서 동일한 컴포넌트에서 여러 번 useState함수를 호출할 수 있도록 한다.
  // 함수형 컴포넌트라면 자식 요소를 얻는다.
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState(initial) {
  // 전역변수로 선언된 hookIndex를 사용하여 fiber의 alternate를 체크해 이미 존재하는 hook인지 체크한다.
  // alternate는 이전 커밋 단계에서 DOM에 추가했던 fiber에 대한 링크이다.
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
  // hook이 이미 존재하는 hook이라면 기존의 훅으로 사용
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = typeof action === 'function' ? action(hook.state) : action;
  });

  const setState = (action) => {
    hook.queue.push(action);
    // 큐에 넣어주고
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    // 재렌더링하면서 state 변경
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

const hasDepsChanged = (prevDeps, nextDeps) =>
  !prevDeps || !nextDeps || prevDeps.length !== nextDeps.length || prevDeps.some((dep, index) => dep !== nextDeps[index]);

function uesEffect(effect, deps) {
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];

  const hasChanged = hasDepsChanged(oldHook ? oldHook.deps : undefined, deps);

  const hook = {
    tag: 'effect',
    effect: hasChanged ? effect : null,
    cancel: hasChanged && oldHook && oldHook.cancel,
    deps,
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
}

function updateHostComponent(fiber) {
  // 함수형 컴포넌트가 아니라면 이전과 같은 일을 한다.
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

// 오래된 fiber를 새로운 엘리먼트로 재조정(reconcile)
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  // 자식요소들 순회
  // 리액트는 더 나은 재조정을 위해 key 를 사용한다.
  while (index < elements.length || oldFiber) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;
    // old fiber와 새로운 엘리먼트가 같은 타입이라면
    if (sameType) {
      // DOM 노드를 유지하고 새로운 props만 업데이트
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE', // 이 속성은 나중에 커밋 단계에서 사용
      };
    }
    // 서로 다 타입이 다르고 새로운 엘리먼트가 존재한다면
    if (element && !sameType) {
      // 새로운 DOM 노드 생성
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT', // 이 속성은 나중에 커밋 단계에서 사용
      };
    }
    // 타입이 다르고 오래된 fiber가 존재한다면
    if (oldFiber && !sameType) {
      // 오래된 노드를 제거
      oldFiber.effectTag = 'DELETION'; // 이 속성은 나중에 커밋 단계에서 사용
      // 여기서 문제는 fiber 트리를 DOM에 커밋할 때 wipRoot에는 오래된 fiber가 없다.
      deletions.push(oldFiber); // 그러므로 deletions 라는 배열이 필요
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      // 첫 번째 자식이라면
      wipFiber.child = newFiber; // 현재 부모 fiber에 현재 자식 fiber 삽입
    } else {
      prevSibling.sibling = newFiber; // 첫 번째 자식이 아니라면 그 전의 형제가 있을 것이고 그 전 형제 fiber의 형제 fiber로 선언
    }

    prevSibling = newFiber; // 다음 형제 fiber를 지금 자식 fiber의 형제 fiber로 등록할 수 있게 이전 형제 fiber로 선언
    index++; // 인덱스를 증가하며 순회
  }
}

const Bingact = {
  createElement,
  render,
  useState,
  uesEffect,
};

export default Bingact;
