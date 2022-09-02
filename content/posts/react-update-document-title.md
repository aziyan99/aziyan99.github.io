---
title: "React: Mengubah Title Halaman Secara Dinamis"
date: 2022-02-04T21:29:54+07:00
draft: false
tags: ['React.js', 'DOM', 'React Hook']
---

Changing document title in pages that was built with React can be little bit tricky. Because, our working area only within `<body></body>` tag. Since React 16.8 we can built custom hook that can easly access the `document.title` and change the active page title.

We can create a hook like:

```
import { useEffect } from "react";

export default function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  });
}
```

And then we can use it anywhere in our pages. Like in `Home.jsx`

```
import useTitle from "./Hooks/useTitle"

export default function Home () {
  useTitle("Webname - Home");
  return (
    <div>
    ...
    </div>
  )
}
```

Done!!