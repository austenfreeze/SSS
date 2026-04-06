import { useState, useEffect } from 'react';
import { useDocumentOperation } from 'sanity';

export const RedactAction = (props: any) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);

  return {
    label: 'Redact Document',
    disabled: publish.disabled || props.draft?.isRedacted,
    onHandle: () => {
      setIsPublishing(true);
      
      // Patching: Marking the doc as redacted and scrubbing sensitive fields
      patch.execute([
        { set: { isRedacted: true } },
        { setIfMissing: { originalTitle: props.draft?.title } },
        { set: { title: `[REDACTED] - ${new Date().toLocaleDateString()}` } }
      ]);
      
      // Immediate push to archive
      publish.execute();
      props.onComplete();
    },
  };
};