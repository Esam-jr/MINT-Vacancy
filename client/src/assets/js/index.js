const collapsibles = document.querySelectorAll('.collapsible');
collapsibles.forEach(item =>
  item.addEventListener('click', function (e) {
    //  console.log(e.target);
    //  console.log(this);
    //  console.log();
    if (e.target.closest('.collapsible__icon'))
      this.classList.toggle('collapsible--expanded');
  })
);
