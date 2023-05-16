export default function GridPosts() {
  return (
    <div className='createPost'>
      <div
        className='createPost_header'
        style={{ justifyContent: 'space-between' }}
      >
        <div className='left_header_grid'>Posts</div>
        <div className='flex'></div>
      </div>
      <div className='create_splitter'></div>
      <div className='createPost_body grid2'>
        <div className='view_type active'>
          <i className='list_icon filter_blue'></i>
          List view
        </div>
      </div>
    </div>
  );
}
