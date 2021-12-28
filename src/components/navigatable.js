import styles from '../style.module.scss';
import React, { useState, useRef } from 'react';

let idx = 0;

function getElementRelativePosition(element, reference) {
  console.info(
    'Calculating offset for',
    element,
    'against',
    reference
  );
  const offset = {
    left: 0,
    top: 0,
  };

  while (element != reference) {
    offset.left = offset.left + element.offsetLeft; // getBoundingClientRect().left;
    offset.top = offset.top + element.offsetTop;
    console.info(
      element,
      element.offsetTop,
      element.offsetLeft,
      element.offsetParent,
      offset
    );

    element = element.offsetParent;
  }

  return offset;
}

const ImageItem = ({}) => (
  <div className={styles.focusableItem} tabindex="0">
    Hello! {idx++}
  </div>
);

const FocusableList = ({
  children,
  direction = 'horizontal',
  ...props
}) => {
  const [offset, setOffset] = useState(0);
  const thisParent = useRef();

  const onFocus = (elm) => {
    console.info(thisParent.current);
    const off =
      direction === 'horizontal'
        ? thisParent.current.clientWidth / 2
        : thisParent.current.clientHeight / 2;

    const totalSize = Array.from(
      thisParent.current.children[0].children
    ).reduce(
      (rest, elm) =>
        direction === 'horizontal'
          ? rest + elm.offsetWidth
          : rest + elm.offsetHeight,
      0
    );

    const loffset = getElementRelativePosition(
      elm.target,
      thisParent.current.children[0]
    );

    let target =
      -(direction === 'horizontal' ? loffset.left : loffset.top) +
      off;

    const minOffset = 0;
    const maxOffset = -(
      totalSize // - elm.target.parentNode.offsetWidth
    );
    if (target > minOffset) target = minOffset;
    if (target < maxOffset) target = maxOffset;

    console.info(
      loffset,
      off,
      target,
      totalSize,
      minOffset,
      maxOffset,
      offset - target
    );

    setOffset(target);
  };

  return (
    <div
      className={
        styles.focusableList +
        ' ' +
        (direction === 'horizontal'
          ? styles.focusableListHorizontal
          : styles.focusableListVertical)
      }
      onFocus={onFocus}
      ref={thisParent}
      {...props}
    >
      <div
        className={styles.scroller}
        style={{
          transform:
            direction === 'horizontal'
              ? `translateX(${offset}px)`
              : `translateY(${offset}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const TestList = () => (
  <FocusableList direction="horizontal">
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
    <ImageItem />
  </FocusableList>
);

/*
  <FocusableList direction="vertical" style={{ height: '100%' }}>
    <TestList />
    <TestList />
    <TestList />
    <TestList />
    <TestList />
    <TestList />
    <TestList />
  </FocusableList>
  */
