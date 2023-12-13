# Document query selector is null

Classic error, it means that the page element hasn't loaded yet.

You can easily run code when it loads with this event listener

```javascript
document.addEventListener("DOMContentLoaded", function() { 
    // Your script
});
```

Reference/s:
- [document.querySelector(...) is null error](https://stackoverflow.com/questions/20495960/document-queryselector-is-null-error)
