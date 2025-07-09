'use client';

import { Collapse, Card, Typography, Space } from 'antd';
import { sampleDigests } from '../sampleData';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <Title level={2}>Weekly Commit Digests</Title>
      <Collapse accordion>
        {sampleDigests.map((digest) => (
          <Panel header={`${digest.user.username}'s Digest (${digest.startDate} - ${digest.endDate})`} key={digest.id}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {digest.summaries.map((summary) => (
                <Card
                  key={summary.id}
                  title={summary.commit.subject}
                  extra={<a href={summary.commit.gerritLink} target="_blank" rel="noopener noreferrer">Gerrit Link</a>}
                  style={{ width: '100%' }}
                >
                  <p><Text strong>Author:</Text> {summary.commit.author}</p>
                  <p><Text strong>Date:</Text> {summary.commit.date}</p>
                  <p><Text strong>Summary:</Text> {summary.content}</p>
                </Card>
              ))}
            </Space>
          </Panel>
        ))}
      </Collapse>
    </main>
  );
}