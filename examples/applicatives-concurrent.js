const Task = require('data.task')

const Db = {

  // wrap finding into a Task
  find: id => new Task(
      (rej, res) => setTimeout(
        () => res( {id: id, title: `Project ${id}`} ),
        100
      )
    )
}


// I only know how to turn my args into report
// I don't know anything about the database where they come from
const reportHeader = (p1, p2) =>
  `Report: ${p1.title} compared to ${p2.title}`


// curried Task to be applied twice
Task.of( p1 => p2 => reportHeader(p1, p2) )

  // apply to both values kicked asyncronously
  .ap(Db.find(20))
  .ap(Db.find(8))

  // Task will wait for both async processes to finish
  // before reporting to console!
  .fork( console.error, console.log )

