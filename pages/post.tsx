import { Card } from 'react-bootstrap'
import Link from 'next/link'

export default function Post(props) {
  const json = props.result.Post;

  return (
    <li>
      {json.map(post => (
        <Card style={{ width: '40rem' }}>
          <Link href="./userPosts">
            rio
          </Link>
          <Card.Img variant="top" src={post.imageUrl} />
          <Card.Body>
            <Card.Text>
              ❤️{post.favosCount} 件 コメント{post.commentsCount} 件
            </Card.Text>
            <Card.Title>{post.title} </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </li>
  )
}
